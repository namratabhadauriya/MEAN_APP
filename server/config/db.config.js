'use strict';

const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/stock";


class MongoConfig {

    constructor(options) {
        /**
         * @description on Class Constructor initialize, get the database connection
         */
        this.getConnection(options).then((db) => {
            this.connection = db;
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    }

    /**
     * @description Validate and add default options for mongo database connection
     * @param {*} opts 
     */
    static validate(opts = {}) {
        if (!opts.hasOwnProperty('useNewUrlParser')) { opts['useNewUrlParser'] = true; }
        if (!opts.hasOwnProperty('useUnifiedTopology')) { opts['useUnifiedTopology'] = true; }
        if (!opts.hasOwnProperty('poolSize')) { opts['poolSize'] = 10; }
        if (!opts.hasOwnProperty('connectTimeoutMS')) { opts['connectTimeoutMS'] = 0; }
        if (!opts.hasOwnProperty('socketTimeoutMS')) { opts['socketTimeoutMS'] = 0; }
        return opts;
    }

    getConnection(opts) {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                opts = opts || {};
                opts = MongoConfig.validate(opts);
                MongoClient.connect(process.env.DATABASE_URI|| url, opts).then((db) => {
                    console.log('Database Connection is complete');
                    resolve(db);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
            }
        });
    }

    /**
     * 
     * @description Will try to return the database
     */
    getDatabase() {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                this.getConnection({}).then((db) => {
                    this.connection = db;
                    resolve(this.connection.db(process.env.DATABASE_NAME || "stock"));
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
            } else {
                resolve(this.connection.db(process.env.DATABASE_NAME || "stock"));
            }
        });
    }

    /**
     * @description - This function will return the database collection
     * @param {string} collection 
     */
    getCollection(collection) {
        return new Promise((resolve, reject) => {
            this.getDatabase().then((db) => {
                resolve(db.collection(collection));
            }).catch((error) => {
                logger.error(error);
                reject(error);
            });
        });
    }
}

const singleton = new MongoConfig({});
module.exports = singleton;