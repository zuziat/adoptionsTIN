var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var cors = require('cors');
const animalRouter = require('./routes/animalRoute');
const adopterRouter = require('./routes/adopterRoute');
const volunteerRouter = require('./routes/volunteerRoute');
const volApiRouter = require('./routes/api/VolunteerApiRoute');
const adoptApiRouter = require('./routes/api/AdopterApiRoute');
const animalApiRouter = require('./routes/api/AnimalApiRoute')
var indexRouter = require('./routes/index');
const i18n = require('i18n');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'my_secret_password',
  resave: false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));


i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  cookie: 'pupil-ado-lang'
})
app.use(i18n.init);
app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['pupil-ado-lang'];
    res.locals.lang = currentLang;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my_secret_password',
  resave: false
}))
app.use((req,res,next)=>{
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});
app.use('/animals', animalRouter);
app.use('/Adopters', adopterRouter);
app.use('/volunteers', volunteerRouter);
app.use('/api/volunteers', volApiRouter);
app.use('/api/Adopters', adoptApiRouter);
app.use('/api/animals', animalApiRouter);
app.use('/', indexRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
