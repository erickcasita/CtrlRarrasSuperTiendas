const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path  = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const {database} = require('./keys');
const favicon = require('serve-favicon');
//Initializations
const app  = express();
require('./lib/passport');
//Settings
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({

    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine', '.hbs');
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'supertiendasrarrasnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//Global Variables

app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.showreporte = req.flash('showreporte');
    app.locals.showreporteshake = req.flash('showreporteshake');
    app.locals.error = req.flash('error');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes'));
app.use('/controlenvases',require('./routes/controlenvases'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/assets/img', 'favicon.ico')))
//Start the Server
app.listen(app.get('port'), () => {

    console.log('Server on port', app.get('port'));

});