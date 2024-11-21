const jwt = require('jsonwebtoken');

const auth = (req, res, next )=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                state :'error' ,
                status:401 , 
                data:null,
                errMessage:'unauthorized',
            });
        };
        const verifyToken = jwt.verify(token , process.env.JWT_SECRET);
        req.body.user = verifyToken ;
        next()
    }catch(err){
        console.log(err) ;
        res.status(500).send(err);
    }

};

module.exports = auth ;