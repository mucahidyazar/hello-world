const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
//const host = process.env.HOST;
mongoose.connect('mongodb://localhost/counter', {useNewUrlParser:true, useUnifiedTopology:true});

//ROUTERS
const indexRouter = require('./routers/index');

// SETTINGS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use('/public', express.static('public'))

app.use(indexRouter);

app.listen(port, ()=>{
    console.log('Server is working on the port nubmer ' + port);
});