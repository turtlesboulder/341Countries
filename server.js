// Everything seems to be ready on this new project

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

//const database = require("./backend/data/database");

const database = require("./backend/data/mongeese");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");



const port = process.env.port || 8080;


app.use(bodyParser.json()); 

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key  ");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});



app.use('/', require("./backend/routes/index"));



/*database.initDB((err)=>{
    // Connect to the database, if it fails, then don't even try to load the page.
    // Send the initDB a callback function that accepts one parameter
    if (err){
        console.log(err);
    }
    else{
        app.listen(port);
        // Can also log here if I want.
    }
})*/
database.mongoose
  .connect(db.url, {
    // Options
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
