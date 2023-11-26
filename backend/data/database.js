const dotenv = require("dotenv");


dotenv.config();
// Use mongeese.js to load up mongoose and the schema
const MongoClient = require("mongodb").MongoClient;

let database;
let initDB = (callback)=>{
    
    if (database){
        console.log("Database is already initialized.");
        return callback(null, database);
        
    }

    MongoClient.connect(process.env.MONGODB_URL)
    .then((client)=>{
        database = client;
        callback(null, database);
    })
    .catch((err)=>{
        callback(err);
    })
};

let getDatabase = ()=>{
    if (!database){
        throw Error("Database not available!")
    }
    return database;
};

module.exports = {
    initDB, getDatabase
};