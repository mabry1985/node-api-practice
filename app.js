const express = require('express');
const app = express()
const mongoose = require('mongoose');
require("dotenv").config();

app.use(express.urlencoded({ extended:true}))
app.use(express.json());

const postsRoute = require('./routes/post')

app.use('/posts', postsRoute)

app.get('/', (req, res) => {
    res.send('We are home!');
})

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true}, () => console.log('connected to DB'))

app.listen(3000);

