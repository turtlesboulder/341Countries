const app = require('express');
const router = app.Router();
const db = require("../data/mongeese");

const controller = require("../controllers/countriesmongoose")(db.country);

router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);
router.post("/", controller.create
/*
        #swagger.description = "Allowed properties are name, population, area, gdppc, gini, hdi. GDPPC is nominal gross domestic product per capita."
        #swagger.parameters["body"] = {
            "in": "body",
            "schema": {
                $name: "String",
                $population: "Number",
                $area: "Number",
                gdppc: "Number",
                gini: "Number",
                hdi: "Number"
            }
        }
    */
);
router.put("/:id", controller.update
/*
        #swagger.description = "Allowed properties are name, population, area, gdppc, gini, hdi. GDPPC is nominal gross domestic product per capita."
        #swagger.parameters["body"] = {
            "in": "body",
            "schema": {
                $name: "String",
                $population: "Number",
                $area: "Number",
                gdppc: "Number",
                gini: "Number",
                hdi: "Number"
            }
        }
    */
);
router.delete("/:id", controller.deleteEntry);



module.exports = router;