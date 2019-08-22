const mysql = require('./mysql')
const Model = require('./model')

module.exports = {
    connect(config) {
        mysql.init(config)
    },
    model(tablename, model, exInfo = {}) {
        return () => {
            return new Model(tablename, model, exInfo)
        }
    }
}