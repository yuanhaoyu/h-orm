const horm = require('../../index')
const mysql = require('../../lib/mysql')

const windows = {
    host            : '127.0.0.1',
    port            : '3306',
    user            : 'root',
    password        : 'root',
    database        : 'test',
    debug           : true
}

const mac = {
    host: '127.0.0.1',
    port: '3306',
    database: 'test',
    user: '',
    password: '',
    debug: true
}

horm.connect(mac)

const StudentModel = horm.model('student', {
    name: String,
    sex: Number,
})

async function main() {
  console.log(await StudentModel())
  console.log(await StudentModel().where({
      sex: 0
  }))
  console.log(await StudentModel().limit(1))
  mysql.close()
}

main()