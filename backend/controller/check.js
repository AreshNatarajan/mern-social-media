exports.check= (req, res, next)=>{
    var token  = req.header('auth');
    res.token = token;
    next();
}