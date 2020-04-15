const mongodb = require('./config/db.config');
const stocks = require('./stock');


const find = function find(req, res, options) {
    const { collection } = options;
    return new Promise((resolve, reject) => {
        if (!collection) {
            throw 'Collection is needed to perform a query!';
        }
        mongodb.getCollection(collection).then((collection) => {
            collection.find().toArray((error, docs) => {
                if (error) {
                    reject(error)
                }
                resolve(docs);
            });
        });
    }).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
}

const insertMany = function insertMany(data, options) {
    const { collection } = options;
    return new Promise((resolve, reject) => {
        if (!collection) {
            throw 'Collection is needed to perform a query!';
        }
        mongodb.getCollection(collection).then((collection) => {
            collection.insertMany(stocks).toArray(function (err, docs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
}

module.exports = {
    find,
    insertMany
}