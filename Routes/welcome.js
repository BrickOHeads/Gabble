// //exact same as app.js except for things found in password
//
// const express = require('express');
// const parseurl = require('parseurl');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const mustacheExpress = require('mustache-express');
// // const users = require('/models/users.js');
// const app = express();
// const models = require("./models");
// const passport = require('passport')
// const session = require('express-session')
// const RedisStore = require('connect-redis')(session)
// const LocalStrategy = require('passport-local').Strategy
//
// const app = express()
// app.use(session({
//   store: new RedisStore({
//     url: config.redisStore.url
//   }),
//   secret: config.redisStore.secret,
//   resave: false,
//   saveUninitialized: false
// }))
//
// app.use(passport.initialize())
// app.use(passport.session())
// app.engine('mustache', mustacheExpress());
// app.set('views', './views');
// app.set('view engine', 'mustache');
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // passport.serializeUser(function(user, done) {
// //   done(null, user);
// // });
// //
// // passport.deserializeUser(function(user, done) {
// //   done(null, user);
// // });
//
// // passport.use(new LocalStrategy(
// //   function(username, password, done) {
// //     findUser(username, function (err, user) {
// //       if (err) {
// //         return done(err)
// //       }
// //       if (!user) {
// //         return done(null, false)
// //       }
// //       if (password !== user.password  ) {
// //         return done(null, false)
// //       }
// //       return done(null, user)
// //     })
// //   }
// // ))
// // function authenticationMiddleware () {
// //   return function (req, res, next) {
// //     if (req.isAuthenticated()) {
// //       return next()
// //     }
// //     res.redirect('/')
// //   }
// // }
// // var oneProfileStrategy = require('passport-oneprofile');
// //
// // passport.use(new oneProfileStrategy({
// //     opId: process.env.ONES_KEY,
// //     opSecret: process.env.ONES_SECRET,
// //     opHost: process.env.ONES_HOST
// // }, function(err, user, done) {
// //   // Do anything for the returned user, or just pass it to callback
// //     done(err, user);
// //   })
// // );
// // app.get('/', function(req, res){
// //   models.users.findAll().then(function(users){
// //   res.render('signup', {user:users})
// //   })
// // });
//
// app.post('/newUser', function(req,res){
//   const user = models.users.build({
//     name: req.body.name,
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email
//   })
//   user.save();
//   res.render('index');
// });
//
//
// //function to authenticate to be called in post
// // function authenticate(req, username, password){
// //   var authenticatedUser = models.users.find(function (user){
// //     if (username === models.users.username && password === models.users.password) {
// //       req.session.authenticated = true;
// //     } else {
// //       return false
// //     }
// //   });
// //   console.log(req.session);
// //   return req.session;
// // }
// // //authenticate code for hte sequelize
// // function authenticate(req, username, password){
// //   const users = req.models.users;
// // users.findOne({
// //   where: {
// //     username: req.models.users,
// //     password: req.models.users
// //   }
// // }).then(function (user) {
// //   if (username === models.users.username && password === models.users.password) {
// //     req.session.authenticated = true;
// //   } else {
// //     return false
// //   }
// // });
// // return req.session;
// // };
// //
// // app.get('/', function (req, res){
// //   res.render('index');
// // });
//
// //redirect to the login page again
// app.post('/logout', function(req, res) {
//   req.session.authenticated = false;
//   res.redirect('/');
// });
//
// //redirect to the signup page!
// app.post('/newUser', function(req, res) {
//   res.render('signup')
// })
//
// //if you fail to enter correct information and do not authenticate!
// app.get('/retrylogin', function (req, res){
//   res.render('retrylogin');
// });
//
// //authentication function and directional post
// app.post('/', function(req, res){
//   var username = req.body.username;
//   var password = req.body.password;
//   authenticate(req, username, password);
//   if (req.session && req.session.authenticated){
//     res.render('welcome', { username: username });
//   } else {
//     res.redirect('/retrylogin');
//   }
// });
//
// app.listen(3000, function(){
//   console.log('Started express application!')
// });
