const {config} = require('../config/index');
const {MongoClient} = require('mongodb')

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
                    console.log('Error :D');
                    reject(err)
                }else{
                    console.log('Connected succesfully to mongodb')
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
}


module.exports = MongoLib;

