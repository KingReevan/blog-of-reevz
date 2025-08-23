const express = require('express')

const app = express();

app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile('./pages/index.html',{ root: __dirname});
});

app.get('/payment', (req,res) => {
    res.sendFile('./pages/payment.html',{ root: __dirname});
});

app.get('/pay', (req,res) => {
    res.redirect('/payment');
});

app.use((req, res) => {
    res.status(404).sendFile('./pages/404.html', {root: __dirname});
});