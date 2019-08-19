const mysql = require('../mysql')
const { toArray } = require('../../util')
const Base = require('./base')

class Model extends Base {
    constructor(data) {
        super(data)
    }
    creat() {
        console.log(1)
    }
    delete() {}
    update() {}
    find(pris) {
        pris = toArray(pris)
        return new Promise((resolve, reject) => {
            const SQL = `select ${this.getModelKey().join(',')} from ${this.__tablename} where ${this.__pri} in (?)`
            mysql.query(SQL, [pris.join(',')])
                .then(res => {
                    resolve(res)
                })
                .catch(err => reject(err))
        })
    }
    where() {}
}

module.exports = Model