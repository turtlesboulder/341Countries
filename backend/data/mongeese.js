const dotenv = require("dotenv");
dotenv.config();
url = process.env.MONGODB_URL;


db = {};
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

db.mongoose = mongoose;
db.url = url;
db.country = require('./country')(mongoose);
db.city = require("./city")(mongoose);

module.exports = db;




// Replace databse.js with this file, connect to the database through mongoose
// https://mongoosejs.com/docs/index.html
// https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/