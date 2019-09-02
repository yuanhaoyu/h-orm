const horm = require('../../index')
const mysql = require('../../lib/mysql')

const windows = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'test',
  debug: true
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
  id: String,
  name: String,
  sex: Number,
});


test(`delete one`, async () => {
  await StudentModel().create({ name: 'aaa', sex: 0 })
  const allTeacher = await StudentModel()
  const result = await StudentModel().delete(allTeacher[allTeacher.length - 1].id)
  expect(result.changedRows).toEqual(1);
});
test(`update where sex = 3`, async () => {
  await StudentModel().create([{ name: 'aaa', sex: 3 }, { name: 'aaa', sex: 3 }])
  const result = await StudentModel().update({ sex: 0 }, { sex: 3 })
  expect(result.changedRows).toEqual(2);
});
test(`update where sex = 3 and name = b`, async () => {
  await StudentModel().create([{ name: 'das', sex: 4 }, { name: 'b', sex: 3 }])
  const result = await StudentModel().update({ sex: 9 }, { sex: 3, name: 'b' })
  expect(result.changedRows).toEqual(1);
});
test(`update where name in b1, b2`, async () => {
  await StudentModel().create([{ name: 'b1', sex: 5 }, { name: 'b2', sex: 5 }])
  const result = await StudentModel().update({ sex: 6 }, { name: ['b1', 'b2'] })
  expect(result.changedRows).toEqual(2);
});
test('close mysql here', () => {
  mysql.close()
})
