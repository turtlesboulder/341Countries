const app = require('express');
const router = app.Router();
const db = require("../data/mongeese");

const controller = require("../controllers/countriesmongoose")(db.city);
//console.log(controller);
router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", controller.create
    /*
        #swagger.description = "Allowed properties are name, population, area, country_id, elevation."
        #swagger.parameters["body"] = {
            "in": "body",
            "schema": {
                $name: "String",
                $population: "Number",
                area: "Number",
                country_id: "ObjectId",
                elevation: "Number"
            }
        }
    */
);
router.put("/:id", controller.update
/*
        #swagger.description = "Allowed properties are name, population, area, country_id, elevation."
        #swagger.parameters["body"] = {
            "in": "body",
            "schema": {
                $name: "String",
                $population: "Number",
                area: "Number",
                country_id: "ObjectId",
                elevation: "Number"
            }
        }
    */
);
router.delete("/:id", controller.deleteEntry);



module.exports = router;