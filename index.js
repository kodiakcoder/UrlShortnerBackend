const express = require('express')
const app = express()
const linksRouter = require('./controller/links')
const mongoose = require('mongoose')
require('dotenv').config()

const port = 3001
mongoose.connect(process.env.MONGODB_URI, {  useUnifiedTopology: true,useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


app.use('/api/links', linksRouter)



app.listen(port, () => console.log('App Listing on Port 3001'))