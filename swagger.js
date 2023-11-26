const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info:{
        title: "Countries API",
        decription: "Test get, put, post, delete",
    },
    host: "localhost:8080",
    schemes: ['http', 'https'],
};

const outputFile = "./swagger.json";
const endpointsFiles = ['./backend/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
// Whenever you run node swagger.js, make sure to update the swagger.json file by removing api docs and changing localhost to
// cse341-contacts-fall-2023.onrender.com 