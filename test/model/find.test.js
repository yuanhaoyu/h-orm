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

horm.connect(windows)

const StudentModel = horm.model('student', {
    name: String,
    sex: Number,
});

(async () => {
  test('find id = 1', async () => {
    expect(await StudentModel().find(1)).toEqual([{ name: 'man', sex: 1 }])
  })
  test('find id = 1,2', async () => {
    expect(await StudentModel().find([1,2])).toEqual([
      { name: 'man', sex: 1 },
      { name: 'ww', sex: 0 },
    ])
  })
  test('close mysql here', () => {
    mysql.close()
  })
})()