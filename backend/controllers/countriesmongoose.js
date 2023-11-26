//const db = require("../data/mongeese");
//const country = db.country;

/*
In a project without swagger (or where I was more familiar with swagger) I would pass in the collection
and re-use the same file for all the collections. I would use a for loop with schema.obj.
for (key in schema.obj){
    entry[key] = req.body[key];
}
await entry.save();


*/ 



module.exports = (mongooseModel) =>{


// MAKE SURE TO USE AWAIT
let getAll = async function (req, res){
    try{
        const databaseEntries = await mongooseModel.find();
        if (!databaseEntries){
            res.status(404).send("No entries were found. (The database is empty?)")
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(databaseEntries);
        }
        
    }catch(err){
        res.status(500).send(err.message || "There was an error getting the entries from the database.")
    }
    
};
let getSingle = async function (req, res){
    try{
        const databaseEntry = await mongooseModel.findById(req.params.id);
        if (!databaseEntry){
            res.status(404).send("The entry with id "+req.params.id+" was not found.")
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(databaseEntry);
        }
    }catch(err){
        res.status(500).send(err.message || "There was an error getting the entry from the database.")
    }
    
};

let create = async function (req, res){
    const newEntry = new mongooseModel({});
    for (key in mongooseModel.schema.obj){
        newEntry[key] = req.body[key];
    }
    try{
        await newEntry.save();
        res.status(204).send();
    }catch(err){
        res.status(500).send(err.message || "Some error occured while creating the entry.");
    }
    
};

let update = async function(req, res){
    try{
        let databaseEntry = await mongooseModel.findById(req.params.id)

        if (!databaseEntry){
            res.status(404).send("The entry with id "+req.params.id+" was not found.");
        }else{
            for (key in mongooseModel.schema.obj){
                databaseEntry[key] = req.body[key];
            }
            await databaseEntry.save();
            res.status(204).send();
        }
        
    }catch(err){
        res.status(500).send(err.message || "Some error occured while editing the entry.");
    }
};

let deleteEntry = async function (req, res){
    try{
        const deletedCount = (await mongooseModel.deleteOne({_id: req.params.id})).deletedCount
        if (deletedCount){
            res.status(204).send();
        }else{
            res.status(404).send("The id specified does not exist in the database.")
        }
        
    }catch(err){
        res.status(500).send(err.message || "Some error occured while deleting the entry.");
    }
    
};



return {
    getAll, getSingle, create, update, deleteEntry
};

};