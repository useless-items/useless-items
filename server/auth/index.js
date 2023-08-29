const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.send("you have reached the auth router")
})





router.post("/register", async (req, res) => {
  try{
    const user = req.body

    user.password = await bcrypt.hash(user.password, 10)

    const result = await prisma.user.create({
      data: user
    })

    if(result){
      const token = jwt.sign({id: result.id}, process.env.JWT)
      res.status(201).send({token})
    }else{
      res.send({message: 'couldnt create new user'})
    }
    
  }catch(err){
    res.send(err.message)
  }
})


router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const user = await prisma.user.findUnique({
    where: {username: username}
  })

  if(user){
    const matchingPassword = await bcrypt.compare(password, user.password);
    if(matchingPassword){
      const token = jwt.sign({id: user.id}, process.env.JWT)
      res.status(201).send({token})
    }else{
      res.send({message: 'couldnt find user'})
    }
  }else{
    res.send({message: 'couldnt find user'})
  }
})







module.exports = router;