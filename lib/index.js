const mysql = require('./mysql')
const Model = require('./model')

module.exports = {
    connect(config) {
        mysql.init(config)
    },
    model(tablename, model, exInfo = {}) {
        const m = new Model(model)
        console.log(m)
        m.setPersonalValue({
            __tablename: tablename,
            __pri: exInfo.pri || 'id',
            __model: model,
        })
        return m
    }
}