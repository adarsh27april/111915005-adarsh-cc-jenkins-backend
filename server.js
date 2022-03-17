const morgan = require('morgan')
require('dotenv').config()

const mongoose = require('mongoose');

const express = require("express");
const userRouter = require('./routes/_users')
const collectionRouter = require('./routes/_collections');

const app = express();
const cors = require('cors');

const port = process.env.client_port || 8430;

//mongoDB
const mongoURI = process.env.mongoURI || `mongodb://localhost:27017/collections`
mongoose.connect(process.env.mongoURI);

// middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())

//middleware for routes => ./routes
app.use('/users', userRouter)
app.use('/collections', collectionRouter);
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Welcome to NodeJS-Express Server" })
})


app.listen(port, () => {
    console.log(`server live in http://localhost:${port}`)
})
