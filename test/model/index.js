const horm = require('../../index')

horm.connect({
    host            : '127.0.0.1',
    port            : '3306',
    user            : 'root',
    password        : 'root',
    database        : 'test',
    debug           : true
})

const StudentModel = horm.model('student', {
    name: String,
    sex: Number,
})

async function main() {
 const res = await StudentModel.find(1)
 console.log(res)
}

main()