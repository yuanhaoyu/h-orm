const horm = require('../../index')
const mysql = require('../../lib/mysql')
const dbConfig = require('../config/db')

horm.connect(dbConfig)

const StudentModel = horm.model('student', {
  name: String,
  sex: Number,
});


test('like %ma%', async () => {
  expect(await StudentModel().like({ name: '%ma%' })).toEqual([
    { name: 'man', sex: 1 },
  ])
})

test('like m%', async () => {
  expect(await StudentModel().like({ name: 'm%' })).toEqual([
    { name: 'man', sex: 1 },
  ])
})
test('like %n', async () => {
  expect(await StudentModel().like({ name: 'm%' })).toEqual([
    { name: 'man', sex: 1 },
  ])
})
test('no like %n', async () => {
  expect(await StudentModel().like({ name: '%n', sex: 1 }, 'NO', 'OR')).toEqual([
    { name: 'ww', sex: 0 },
    { name: 'adad', sex: 1 },
  ])
})

test('close mysql here', () => {
  mysql.close()
})
