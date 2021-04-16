const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./app/models');
const config = require('./config');

config.express(app)
config.routes(app);
const {mongoUri} = config.app;

mongoose.connect(mongoUri).then(()=> {
}  ).catch(err=>console.log("Error connection to MongoDB",mongoUri,err))
app.listen(
    29950,
    () => console.log('Сервер запущен на порту:'));
