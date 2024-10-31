const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const blogRoutes = require('./routes/blog');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const authRoutes = require('./routes/auth');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/shopping-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });

// Session configuration
const sessionConfig = {
    secret: 'keyboard cat', // In production, use a stronger secret and store it securely
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // Helps prevent XSS attacks
        expires: Date.now() + 24 * 7 * 60 * 60 * 1000, // 1 week expiration
        maxAge: 24 * 7 * 60 * 60 * 1000 // 1 week in milliseconds
    }
};

// Seed the database (optional, comment out if not needed)
// seedDB();

// Set up view engine and static folder
app.engine('ejs', ejsMate); // Use ejs-mate for layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views folder
app.use(express.static(path.join(__dirname, 'public'))); // Public folder for static files

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride('_method')); // Support for PUT and DELETE forms
app.use(session(sessionConfig)); // Set up session handling
app.use(flash()); // Flash message handling

// Passport.js middleware for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// Set up flash and current user variables for all views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use(blogRoutes); // Blog routes
app.use(authRoutes); // Authentication routes

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(8080, () => {
    console.log("Server running on port 8080");
});
