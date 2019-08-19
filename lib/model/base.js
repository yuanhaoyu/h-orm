const mysql = require('../mysql')

class Base {
    constructor(config) {
        for (let key in config) {
            this[key] = null
        }
    }
    query(sql) {
        mysql.query(sql)
    }
    setPersonalValue(data) {
        for (let key in data) {
            this[key] = data[key]
            Object.defineProperty(this, key, { enumerable: false })
        }
    }
    getModelKey() {
        return Object.keys(this.__model)
    }
}

module.exports = Base