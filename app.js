require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js')
const app = express();

const dbURI = process.env.DATABASE_URL;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views','pages');

//middleware
app.use(morgan('common'));
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/all-blogs', (req,res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs',blogRoutes);


app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});