const {config} = require('../config/index');
const debug = require('debug')('app:mongo')
const {MongoClient, ObjectId} = require('mongodb')

const USER = encodeURIComponent(config.DB_USER);
const PASSWORD = encodeURIComponent(config.DB_PASSWORD);
const MONGODB_NAME = config.DB_NAME;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0-rey5q.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`

class MongoLib{
    constructor(){
        this.client = new MongoClient(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        this.dbName = MONGODB_NAME;
    }

    connect(){
        return new Promise((resolve, reject) => {
            this.client.connect(err=>{
                if(err){
                    debug('Error :D');
                    reject(err)
                }else{
                    debug('Connected succesfully to mongodb')
                    resolve(this.client.db(this.dbName))
                }


            });
        });
    }
    getAll(collection, query) {
        return this.connect().then( db =>{
            return db
            .collection(collection)
            .find(query)
            .toArray()
        })
    }

    get(collection, id){
        return this.connect().then(db=>{
            return db.collection(collection).findOne({ _id: ObjectId(id)})
        });
    }

    create(collection, data){
        return this.connect().then( db=>{
            return db.collection(collection).insertOne(data);
        })
        .then(result=> result.insertedId);
    }

    update(collection, id, data){
        return this.connect().then(db=>{
            return db.collection(collection).updateOne({_id: ObjectId(id)},
            {$set: data},
            {upsert: true})
        }).then(result => result.upsertedId || id);
    }
    delete(collection, id) {
        return this.connect()
          .then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
          })
          .then(() => id);
      }


}


module.exports = MongoLib;

