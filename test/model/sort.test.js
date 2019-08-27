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
  test('sort by name asc', async () => {
    expect(await StudentModel().sort({key: 'name', rule: 'ASC'})).toEqual([
      { name: 'adad', sex: 1 },
      { name: 'man', sex: 1 },
      { name: 'ww', sex: 0 },
    ])
  })
  test('sort by name desc', async () => {
    expect(await StudentModel().sort({key: 'name', rule: 'DESC'})).toEqual([
      { name: 'ww', sex: 0 },
      { name: 'man', sex: 1 },
      { name: 'adad', sex: 1 },
    ])
  })
  test('sort by name and sex asc', async () => {
    expect(await StudentModel().sort([{key: 'name', rule: 'ASC'}, {key: 'sex', rule: 'ASC'}])).toEqual([
      { name: 'adad', sex: 1 },
      { name: 'man', sex: 1 },
      { name: 'ww', sex: 0 },
    ])
  })
  test('sort by name and sex asc', async () => {
    expect(await StudentModel().sort([{key: 'name', rule: 'ASC'}, {key: 'sex', rule: 'DESC'}])).toEqual([
      { name: 'adad', sex: 1 },
      { name: 'man', sex: 1 },
      { name: 'ww', sex: 0 },
    ])
  })
  test('close mysql here', () => {
    mysql.close()
  })
})()