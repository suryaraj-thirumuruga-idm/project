
const jwt  = require ("jsonwebtoken");
const JWT_KEY ="qwjepojrjeopjfef"
const tokengenerating =(email)=>{
    const token=jwt.sign(
        {email}, //payload
        JWT_KEY, //seceret key
)
    return token;
}
const tokenvalidator =(token)=>{
    try{
           const  data = jwt.verify(token,JWT_KEY);
           return data;       
    }
    catch (err){
            res.send(err);
    }
}
  
module.exports.tokengenerating=tokengenerating;
module.exports.tokenvalidator=tokenvalidator;