const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const users = require('./models/users.js');
const app = express();
const models = require("./models");
const pg = require('pg');
app.use (session ({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static('./views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/newUser', function(req,res){
  const user = models.users.build({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  user.save();
  res.render('index');
});

app.post('/login', function (req,res){
  let username = req.body.username
  let password = req.body.password
  models.users.findOne({
    where: {
      username: username,
      password: password
    }
}).then(users => {
    if (users.password === password && users.username === username)
      req.session.username = username;
      req.session.usersId = users.id;
      req.session.authenticated = true;
      res.redirect('/welcome');
  }).catch(error => {
    req.session.authenticated = false;
    res.redirect('/retrylogin');
  })
  // console.log(req.session);
  return req.session;
});

app.get('/', function (req, res){
  res.render('index');
});

app.post('/redirectlogin', function (req, res){
  res.redirect('/');
});

//redirect to the login page again
app.post('/logout', function(req, res) {
  req.session.authenticated = false;
  res.redirect('/');
});

//redirect to the signup page!
app.post('/signup', function(req, res) {
  res.render('signup')
})

//if you fail to enter correct information and do not authenticate!
app.get('/retrylogin', function (req, res){
  res.render('retrylogin');
});


app.get('/welcome', function (req, res){
  const username =req.session.username;
  models.post.findAll({order: [['id', 'DESC']]}).then(function(posts){
    res.render('welcome', {username: username, post: posts});
  })
});

// post_input from welcome.mustache file
app.post('/post_input', function (req,res){
  const post = models.post.build({
              body: req.body.postInput,
              });
              post.save();
    res.redirect('/welcome');
})


// for the
app.listen(process.env.PORT || 3000, function(){
  console.log('Started express application!')
});
