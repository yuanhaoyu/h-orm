const mysql = require('mysql');

module.exports = {
    pool: null,
    connConfig: {},
    debug: false,

    __getPool() {
        if (!this.pool) {
            this.debug = this.connConfig.debug
            this.pool = mysql.createPool({
                connectionLimit : this.connConfig.limit || 10,
                port            : this.connConfig.port || 3306,
                host            : this.connConfig.host || 'example.org',
                user            : this.connConfig.user || 'bob',
                password        : this.connConfig.password || 'secret',
                database        : this.connConfig.database || 'my_db'
            })
        }
        return this.pool

    },
    init(config) {
        if (this.debug) {
            console.log(config)
        }
        if (!Object.keys(config).length) {
            throw new Error('[h-rom]: db config muse hava value when you use init function')
        }
        this.connConfig = config
        return this.__getPool()
    },
    query(sql, value) {
        if (this.debug) {
            console.log(sql)
        }
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                reject(new Error('[h-rom]: you should init db before use query'))
            } else {
                this.pool.getConnection(function(err, connection) {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(sql, value)
                        connection.query(sql, value, function (error, results, fields) {
                            connection.release();                         
                            if (error) {
                                reject(error)
                            }
                            resolve({
                                results,
                                fields
                            })
                        })
                    }
                })
            }
        })
    }
}