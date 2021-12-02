const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    const token = req.get("authorization");

    if(!token || !token.toLowerCase().startsWith("bearer")){ //if there is no token or it does not start with the word bearer...
        const response = {
            status: 401,
            msg: "authorization header is missing"
        }
        return res.status(401).json(response)
    }
    console.log(token.substring(7));
    try {
        const decodedToken = jwt.verify(token.substring(7),process.env.KEY_SECRET) // method to verify the supplied token
        
        if(!decodedToken.id){
            const response = {
                status: 403,
                msg: "invalid token"
            }
            return res.status(403).json(response)
        }
        
        next()
    } catch (error) {
        const response = {
            status: 403,
            msg: "invalid or expired token"
        }
        console.log(error);
        return res.status(403).json(response)    
    }
}