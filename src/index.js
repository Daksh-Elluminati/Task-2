const path = require('path');
const express = require('express');
require('./db/mongoose.js');
const hbs = require('hbs');
const userRouter = require('../src/routers/user.js');

const app = express();

app.use(express.json());

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath));

app.use(userRouter);

app.listen(3000, () => {
    console.log("Port up on 3000");
})