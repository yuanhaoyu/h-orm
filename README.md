# h-orm
H-orm is a mysql orm for nodejs

H-orm is also meaning happy and easy to use

## Usage example

Here is an example how to use h-orm

```javascript
const horm = require('h-orm')

horm.connect({
    host: '127.0.0.1',
    port: '3306',
    database: 'test',
    user: 'your username',
    password: 'your password',
    debug: true
})

const StudentModel = horm.model('teacher', {
    name: String,
    sex: Number,
});

(async () => {
   console.log(await StudentModel())
   console.log(await StudentModel().find(1))
   console.log(await StudentModel().create({sex: 0}))
   console.log(await StudentModel().delete({sex: 0}))
   console.log(await StudentModel().update({sex: 0}, {id: 1}))
})()


```

## Api

### horm

#### connect(config)
Create a mysql connect pool, you can set follow setting

```js
{
    host            : '127.0.0.1',
    port            : '3306',
    user            : 'your username',
    password        : 'your password',
    database        : 'your database',
    debug           : true // trun on this debug you will see all sql
}
```

#### model(tabname, schema, exInfo)
You will get a model instance after use model function

```js
const hormInstance = horm.model('student', {
	name: String,
	sex: Number
})
```

How about exInfo?

You can use exInfo set some default setting

```js
{
  status: 'status',  // when use delete , really change field ( 0 || 1) , 'status' is default value
  pri: 'id' // table pri, 'id' is default value 
}
```


### hormInstance


#### hormInstance()
Get all schema from table

```js
(async () => {
  await hormInstance() 
})()

```

#### create(data)
Create one data or more

```js
(async () => {
  await hormInstance().create({name: 1})
  await hormInstance().create([{name: 1}, {name: 2}])
})()

```

#### delete(data)

Delete some data which name = 1 or prikey = 1

```js
(async () => {
  await hormInstance().delete({name: 1})
  await hormInstance().delete(1)
})()

```


#### update(changeData, whereDate)
Update data

```js
(async () => {
  await hormInstance().update({name: 1}, {sex: 0})
})()

```

#### find(data)
Find prikey = 1 or prikey in (1,2,3)

```js
(async () => {
  await hormInstance().find(1)
  await hormInstance().find([1,2,3])
})()

```

#### where(serachData)
Find info which include serachData

```js
(async () => {
  await hormInstance().where({sex: 0})
})()

```

#### limit(num)
Return limit result

```js
(async () => {
  await hormInstance().limit(10)
  await hormInstance().where({sex: 0}).limit(1)
})()

```

## License

MIT
