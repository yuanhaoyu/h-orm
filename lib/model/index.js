const mysql = require('../mysql')
const { toArray } = require('../../util')
/**
 * @param {*} tableName - tablename
 * @param {*} schema - schema
 * @param {*} exInfo - ex info
 */
function Model (tableName, schema = {}, exInfo = {}) {
  this.table = tableName
  this.schema = schema
  this.schemaKey = Object.keys(schema).join(',')
  this.conditions = {}
  this.type = 'select'
  this.pri = exInfo.pri || 'id'
  this.status = exInfo.status || 'status'
  const self = new Promise((resolve, reject) => {
    setTimeout(() => {
      let SQL = ''
      switch (this.type) {
        case 'insert':
          const insertKey = Object.keys(this.conditions['insert'][0]).join(',')
          const insertValue = []
          this.conditions['insert'].forEach(data => {
            insertValue.push(`(${Object.values(data).map( d => mysql.escape(d)).join(',')})`)
          })
          SQL = `insert into ${this.table} (${insertKey}) VALUES ${insertValue.join(',')}`
          break
        case 'select':
          SQL = `select ${this.schemaKey} from ${this.table} `
          // where
          if (this.conditions['select']) {
            const conditions = []
            for (let key in this.conditions['select']) {
              conditions.push(`${key} in ( ${mysql.escape(this.conditions['select'][key]) } )`)
            }
            SQL = SQL + `where ${conditions.join(' and ')}`
          }
          break
        case 'update':
          const updateconditions = []
          const whereconditions = []
          for (let key in this.conditions['update']) {
            const updateValue = this.conditions['update'][key]
            updateconditions.push(`${key} = ${mysql.escape(updateValue)} `)
          }
          for (let key in this.conditions['updateWhere']) {
            const whereValue = this.conditions['updateWhere'][key]
            whereconditions.push(`${key} in ( ${mysql.escape(whereValue)} )`)
          }
          SQL = `update ${this.table} set ${updateconditions.join(', ')} where ${whereconditions.join('and')}`
          break
        default:
          break
      }
      mysql.query(SQL)
        .then(res => {
          let result = JSON.parse(JSON.stringify(res.results))
          // limit
          if (this.type = 'select' && this.conditions['limit']) {
            result = result.slice(0, Number(this.conditions['limit']))
          }
          // reset
          this.conditions = {}
          this.type = 'select'
          resolve(result)
        })
        .catch(err => reject(err))
    }, 0);
  })
  // create
  self.create = (obj) => {
    this.type = 'insert'
    this.conditions['insert'] = toArray(obj)
    return self
  }
  // delete
  self.delete = (obj = {}) => {
    if(typeof obj !== 'object') {
      let pri_val = obj
      obj = {}
      obj[this.pri] =pri_val
    }
    let updateVal = {}
    updateVal[this.status] = 0
    self.update(updateVal, obj)
    return self
  }
  // update
  self.update = (obj = {}, whereObj = {}) => {
    this.type = 'update'
    this.conditions['update'] = Object.assign({}, this.conditions['update'], obj)
    this.conditions['updateWhere'] = Object.assign({}, this.conditions['updateWhere'], whereObj)
    return self
  }
  // select
  self.where = (obj) => {
    this.type = 'select'
    this.conditions['select'] = Object.assign({}, this.conditions['select'], obj)
    return self
  }
  // select
  self.find = (pris) => {
    const query = {}
    query[this.pri] = toArray(pris)
    self.where(query)
    return self
  }
  self.limit = num => {
    this.conditions['limit'] = num
    return self
  }
  return self
}

module.exports = Model
