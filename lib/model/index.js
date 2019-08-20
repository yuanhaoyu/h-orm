const mysql = require('../mysql')
const { toArray } = require('../../util')
/**
 * @param {*} tableName - 表名
 * @param {*} schema - 结构
 * @param {*} exInfo - 额外
 */
function Model (tableName, schema = {}, exInfo = {}) {
  this.table = tableName
  this.schema = schema
  this.conditions = {}
  this.type = 'select'
  this.pri = exInfo.pri || 'id'
  this.status = exInfo.status || 'status'
  const self = new Promise((resolve, reject) => {
    setTimeout(() => {
      let SQL = ''
      switch (this.type) {
        case 'select':
          SQL = `select ${Object.keys(this.schema).join(',')} from ${this.table} `
          // where
          if (this.conditions['select']) {
            const conditions = []
            for (let key in this.conditions['select']) {
              conditions.push(`${key} in ( ${typeof this.conditions['select'][key] === 'string' ? '"' + mysql.escape(this.conditions['select'][key]) + '"' : mysql.escape(this.conditions['select'][key]) } )`)
            }
            SQL = SQL + `where ${conditions.join(' and ')}`
          }
          break;
        default:
          break;
      }
      mysql.query(SQL)
        .then(res => {
          let result = JSON.parse(JSON.stringify(res.results))
          // limit
          if (this.conditions['limit']) {
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
  // 新增
  self.creat = () => {}
  // 删除
  self.delete = () => {}
  // 更改
  self.update = () => {}
  // 查询
  self.where = (obj) => {
    this.type = 'select'
    this.conditions['select'] = Object.assign({}, this.conditions['select'], obj)
    return self
  }
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
