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

const StudentModel = horm.model('teacher', {
    id: String,
    name: String,
    sex: Number,
});

(async () => {
  test(`delete one`,async () => {
    await StudentModel().create({name: 'aaa', sex: 0})
    const allTeacher = await StudentModel()
    const result = await StudentModel().delete(allTeacher[allTeacher.length - 1].id)
    expect(result.changedRows).toEqual(1);
  });
  test(`update where sex = 3`,async () => {
    await StudentModel().create([{name: 'aaa', sex: 3}, {name: 'aaa', sex: 3}])
    const result = await StudentModel().update({sex: 0}, { sex: 3})
    expect(result.changedRows).toEqual(2);
  });
  test('close mysql here', () => {
    mysql.close()
  })
})()