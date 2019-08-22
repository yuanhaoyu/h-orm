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

const StudentModel = horm.model('teacher', {
    name: String,
    sex: Number,
});

(async () => {
    test('insert one teacher', async () => {
    const result = await StudentModel().create({name: 1, sex: 0, status: 1})
    expect(result.affectedRows).toEqual(1);
  });
  test('insert three teacher', async () => {
    const result = await StudentModel().create([{name: 1, sex: 0, status: 1}, {name: '222', sex: 1, status: 1}, {name: '123131', sex: 0, status: 1}])
    expect(result.affectedRows).toEqual(3);
  });
  test('close mysql here', () => {
    mysql.close()
  })
})()