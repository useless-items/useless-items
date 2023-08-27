const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("you have reached the auth router")
})





router.post("/register", async (req, res) => {
  try{
    const user = req.body

    user.password 

    
  }catch(err){
    res.send(err.message)
  }
})

module.exports = router;