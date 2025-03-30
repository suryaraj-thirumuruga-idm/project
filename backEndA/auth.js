const { tokenvalidator } = require("./Router/Token");

const verify = (req, res, next) => {
  const token = req.headers['auth'];
  
  if (!token) {
    return res.send("Access Denied: No token provided");
  }
  const valid = tokenvalidator(token);  
  if (valid) {
    next(); 
  } else {
    res.send("Access Denied: Invalid token");  
  }
};

module.exports = verify;
