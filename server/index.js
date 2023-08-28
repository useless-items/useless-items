const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const PORT = 3009;


app.use(require("body-parser").json());

app.use((req, res, next) => {
  const auth = req.headers.authorization;

  const token = auth?.startsWith("Bearer ") ? auth.slice(7): null;

  try{
    const {id} = jwt.verify(token, process.env.JWT);
    req.userid = id;
  }catch{
    req.userId = null;
  }
  next();
})

app.use('/auth', require('./auth'))


app.listen(PORT, (err) => {
  if(!err){
    console.log(`listening on port ${PORT}`)
  }else{
    console.log('no work')
  }
})

