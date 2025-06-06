const path = require('path');
const mongoose = require('mongoose')

const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;

const dotenv = require('dotenv').config()

const app = express();

const store = new MongoDbStore({
  uri: process.env.MONGODB_URL,
  collection: 'session'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const User = require('./models/user')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "A big dog",
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use((req, res, next) => {
  if(!req.session.user){
    return next()
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)

app.use(errorController.get404);

mongoose.connect(process.env.MONGODB_URL).then(result => {
  console.log("connected to DB");
  app.listen(3000)
}).catch(err => {
  console.log("Error DB:", err);
})

