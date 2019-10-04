const horm = require('../../index')
const mysql = require('../../lib/mysql')
const dbConfig = require('../config/db')

horm.connect(dbConfig)

const StudentModel = horm.model('student', {
  name: String,
  sex: Number,
});


test('all limit 1', async () => {
  expect(await StudentModel().limit(1)).toEqual([{ name: 'man', sex: 1 }])
})
test('all limit 1 - 2', async () => {
  expect(await StudentModel().limit(1, 2)).toEqual([{ name: 'ww', sex: 0 }, { name: 'adad', sex: 1 }])
})
test('all limit 0 - 3', async () => {
  expect(await StudentModel().limit(0, 3)).toEqual([{ name: 'man', sex: 1 }, { name: 'ww', sex: 0 }, { name: 'adad', sex: 1 }])
})
test('close mysql here', () => {
  mysql.close()
})
