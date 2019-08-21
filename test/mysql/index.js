const mysql = require('../../lib/mysql/index')

async function main() {
    await mysql.init({
        host            : '127.0.0.1',
        port            : '3306',
        user            : 'root',
        password        : 'root',
        database        : 'test',
        debug           : true
    })
    const res = await mysql.query(`select * from student`)
    console.log(res)
}

main()