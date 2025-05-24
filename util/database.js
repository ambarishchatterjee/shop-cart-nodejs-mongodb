const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected!');
      _db = client.db()
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

const getdb = ()=>{
  if(_db){
    return _db
  }else{
    throw 'No database found'
  }
}

exports.mongoConnect = mongoConnect
exports.getdb = getdb