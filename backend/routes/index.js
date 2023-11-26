const express = require("express");
const app = express();


const router = express.Router();
const path = require('path');

router.use("/", require("./swagger"));

router.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});


router.use("/countries", require("./countries"));
router.use("/cities", require("./cities"));

module.exports = router;