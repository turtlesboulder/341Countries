const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");
let objectId = require("mongodb").ObjectId;


//add put, delete, etc.


let getAll = async (req, res)=>{
    
    let result = await mongodb.getDatabase().db("countryDB").collection("countries").find();
    result.toArray((error, array) =>{
        if (error){
            res.status(400).json({"message":error});
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(array);
    })
};

let getSingle = async (req, res)=>{
    let userId = new ObjectId(req.params.id);
    
    let result = await mongodb.getDatabase().db("countryDB").collection("countries").find({_id: userId});

    result.toArray((error, array) =>{
        if (error){
            res.status(400).json({"message":error});
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(array[0]);
    })
};



let create = async(req, res)=>{
    
    let country = {
        area: req.body.area,
        population: req.body.population,
        gdppc: req.body.gdppc,
        gini: req.body.gini,
        hdi: req.body.hdi,
        name: req.body.name
    };

    let response = await mongodb.getDatabase().db("countryDB").collection("countries").insertOne( country);
    if (response.acknowledged){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || "An unknown error occured while creating the entry.");
    }
    
};

let update = async(req, res)=>{
    let userId = new ObjectId(req.params.id);
    let country = {
        area: req.body.area,
        population: req.body.population,
        gdppc: req.body.gdppc,
        gini: req.body.gini,
        hdi: req.body.hdi,
        name: req.body.name
    };
    let response = await mongodb.getDatabase().db("countryDB").collection("countries").replaceOne({_id: userId}, country);
    if (response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || "An unknown error occured while updating the entry.");
    }
};

let deleteEntry = async(req, res)=>{
    let userId = new ObjectId(req.params.id);
    let response = await mongodb.getDatabase().db("countryDB").collection("countries").deleteOne({_id : userId});
    if (response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || "An unknown error occured while updating the user.");
    }
};

module.exports = {
    getAll, getSingle, create, update, deleteEntry
};