const express = require("express");
const passport = require("passport");
const app = express();
const fs = require('fs');

const router = express.Router();
const path = require('path');

router.use("/", require("./swagger"));

router.get('/', (req, res) =>{
    let html = fs.readFileSync(path.join(__dirname, "../../frontend/index.html"), 'utf8');
    let replaceText = (req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out');
    html = html.replace('<!--PLACEHOLDER-->', replaceText);
    res.send(html);
});


router.use("/countries", require("./countries"));
router.use("/cities", require("./cities"));

router.get('/login', passport.authenticate('github'), (req, res)=>{})
// Why use the function keyword here? I don't see any use of this.
router.get('/logout', function(req, res, next){
    req.logOut(function(err){
        if (err){
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;