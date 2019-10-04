const horm = require('../../index')
const mysql = require('../../lib/mysql')
const dbConfig = require('../config/db')

horm.connect(dbConfig)

const StudentModel = horm.model('student', {
    name: String,
    sex: Number,
});


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
