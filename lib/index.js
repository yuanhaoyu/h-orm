const mysql = require('./mysql')
const Model = require('./model')

module.exports = {
    connect(config) {
        mysql.init(config)
    },
    model(tablename, model, exInfo = {}) {
        this.tablename = tablename
        this.model = model
        this.exInfo = exInfo
        return this.instance.bind(this)
    },
    instance() {
        return new Model(this.tablename, this.model, this.exInfo )
    }
}