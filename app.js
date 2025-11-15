
require('events').EventEmitter.defaultMaxListeners = 20; // or higher

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const flash = require('connect-flash');
const expressSession = require('express-session');

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const isLoggedin = require('./middlewares/isLoggedin');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
const productModel = require('./models/product-model')
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {

    res.render('signup');
});

app.get('/login', (req, res) => {
    let error = req.flash('error');
    res.render('login', { error });
});

app.get('/shop', isLoggedin, async (req, res) => {
    let success_msg = req.flash('success');
    let user = req.user;
    let products = await productModel.find();
    res.render('shop', { products, success_msg, user });

});

app.get('/logout', (req, res) => {
    res.cookie('token', '');
    res.redirect('/login');
})








module.exports = app;

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
}