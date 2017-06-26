/**
 * Created by Tuber on 2017/6/26.
 */
//引入mongodb模块
const MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/usermanage';

//封装获取数据库的函数
function getDB(callback) {
    MongoClient.connect(url, (err, db) => {
        if(err) {
            callback(err);
        }else {
            callback(null, db);
        }
        db.close();
    });
}



//封装查找一条数据的方法并暴露出去
exports.findOne = (collectionName, select, callback) => {
    getDB((err, db) => {
        db.collection(collectionName).findOne(select, (error, docs) => {
            if(error) {
                callback(error);
            }else {
                callback(null,docs);
            }
        });
    });
}


//封装插入一条数据的方法并暴露出去
exports.insertOne = (collectionName, data, callback) => {
    getDB((err, db) => {
        db.collection(collectionName).insertOne(data, (error, result) => {
            if(error) {
                callback(error);
            }else {
                callback(null ,result);
            }
        });
    });
}