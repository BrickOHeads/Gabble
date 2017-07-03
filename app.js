const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  var views = req.session.views;

  if (!views) {
    views = req.session.views = {};
  }
  var pathname = parseurl(req).pathname;
  views[pathname] = (views[pathname] || 0) + 1
  next();
})

function authenticate(req, username, password){
  var authenticatedUser = data.users.find(function (user) {
    if (username === user.username && password === user.password) {
      req.session.authenticated = true;
      console.log('User & Password Authenticated');
    } else {
      return false
    }
  });
  console.log(req.session);
  return req.session;
}

app.get('/', function (req, res){
  res.render('index');
});

app.post('/logout', function(req, res) {
  req.session.authenticated = false;
  console.log(req.session);
  res.redirect('/');
})

app.get('/retrylogin', function (req, res){
  res.render('retrylogin');
});

app.post('/', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  authenticate(req, username, password);
  if (req.session && req.session.authenticated){
    res.render('welcome', { username: username });
  } else {
    res.redirect('/retrylogin');
  }
})

// var logOut = document.getElementById('log-out').addEventListener("click", function clear(){this.reload();
// });
app.listen(3000, function(){
  console.log('Started express application!')
});
