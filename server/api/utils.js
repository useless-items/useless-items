const requireUser = (req, res, next) => {
    if(req.userId){
        next();
    } else {
        res.status(401).send({ message: "User unauthorized"});
    }
} 

modules.exports = {
    requireUser
}