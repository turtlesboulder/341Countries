// TODO: install new packages
// Edit this file to make sure the authentication packages are set up
// edit the routes to make sure the user is authenticated.

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require('express-session');
const githubPassportStrategy = require("passport-github2").Strategy;
const cors = require('cors');

//const database = require("./backend/data/database");

const database = require("./backend/data/mongeese");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");



const port = process.env.port || 8080;


app.use(bodyParser.json()); 
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key  ");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use(cors({methods:['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({origin: '*'}));



app.use('/', require("./backend/routes/index"));


passport.use(new githubPassportStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL

},
function(accessToken, refreshToken, profile, done){
    return done(null, profile)
}
));

passport.serializeUser((user, done)=>{
  done(null, user);
});
passport.deserializeUser((user, done)=>{
  done(null, user);
});

// The below does nothing because of my little frontend I have set up
// How do I make this message show up there?
app.get('/', (req, res)=>{
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out');
  /*
  if (req.session.user !== undefined){
    res.send(`Logged in as ${req.session.user.displayName}`);
  }else{
    res.send('Logged Out');
  }
   */
})
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session:false}),
  (req, res)=>{
    req.session.user = req.user;
    res.redirect('/');
  }
);
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
