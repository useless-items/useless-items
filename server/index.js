const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const PORT = 3009;


app.use(require("body-parser").json());



app.use('/auth', require('./auth'))


app.listen(PORT, (err) => {
  if(!err){
    console.log(`listening on port ${PORT}`)
  }else{
    console.log('no work')
  }
})

