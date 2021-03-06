const horm = require('../../index')
const mysql = require('../../lib/mysql')
const dbConfig = require('../config/db')

horm.connect(dbConfig)

const StudentModel = horm.model('student', {
  name: String,
  sex: Number,
});


test('gel All student', async () => {
  expect(await StudentModel()).toEqual([
    { name: 'man', sex: 1 },
    { name: 'ww', sex: 0 },
    { name: 'adad', sex: 1 }
  ]);
});

test('where null', async () => {
  expect(await StudentModel().where()).toEqual([
    { name: 'man', sex: 1 },
    { name: 'ww', sex: 0 },
    { name: 'adad', sex: 1 }
  ])
})

test('where {}', async () => {
  expect(await StudentModel().where({})).toEqual([
    { name: 'man', sex: 1 },
    { name: 'ww', sex: 0 },
    { name: 'adad', sex: 1 }
  ])
})

test('where {sex: 0}', async () => {
  expect(await StudentModel().where({ sex: 0 })).toEqual([
    { name: 'ww', sex: 0 }
  ])
})

test('where {sex: 0}', async () => {
  expect(await StudentModel().where({ sex: ['0', '1'] })).toEqual([
    { name: 'man', sex: 1 },
    { name: 'ww', sex: 0 },
    { name: 'adad', sex: 1 }
  ])
})

test('where {sex: 0} and name like ad', async () => {
  expect(await StudentModel().where({ sex: 1, name_like: '%ad%' })).toEqual([
    { name: 'adad', sex: 1 },
  ])
})

test('where {sex: 0} and name not like ad', async () => {
  expect(await StudentModel().where({ sex: 1, name_not_like: '%ad%' })).toEqual([
    { name: 'man', sex: 1 },
  ])
})

test('where name like %ma%', async () => {
  expect(await StudentModel().where({ name_like: '%ma%' })).toEqual([
    { name: 'man', sex: 1 },
  ])
})

test('where name like %ma%', async () => {
  expect(await StudentModel().where({ name_not_like: '%ma%' })).toEqual([
    { name: 'ww', sex: 0 },
    { name: 'adad', sex: 1 }
  ])
})

test('where {sex: 0} or {sex: 1}', async () => {
  expect(await StudentModel().where({ sex: 0, name: 'man' }, 'OR')).toEqual([
    { name: 'man', sex: 1 },
    { name: 'ww', sex: 0 },
  ])
})

test('close mysql here', () => {
  mysql.close()
})
