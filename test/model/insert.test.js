const horm = require('../../index')
const mysql = require('../../lib/mysql')
const dbConfig = require('../config/db')

horm.connect(dbConfig)

const StudentModel = horm.model('teacher', {
  name: String,
  sex: Number,
});


test('insert one teacher', async () => {
  const result = await StudentModel().create({ name: 1, sex: 0, status: 1 })
  expect(result.affectedRows).toEqual(1);
});
test('insert three teacher', async () => {
  const result = await StudentModel().create([{ name: 1, sex: 0, status: 1 }, { name: '222', sex: 1, status: 1 }, { name: '123131', sex: 0, status: 1 }])
  expect(result.affectedRows).toEqual(3);
});
test('close mysql here', () => {
  mysql.close()
})
