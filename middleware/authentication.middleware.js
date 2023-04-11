const jwt= require("jsonwebtoken")
const secret=process.env.SECRET_KEY
const authenticaeUser= (req,res,next)=>{
    const token=req.headers?.token;

    if(!token){
        return res.status(400).send({mes:"Please provide token"})
    }

    try {
        const dec= jwt.verify(token,secret)

        if(dec){
            req.body.userId= dec.userId
            next()
        }else{
            return res.status(401).send({mes:"Invalid token"})  
        }
    } catch (error) {
        res.status(500).send({mes:"Server error",error}) 
    }
}

module.exports=authenticaeUser