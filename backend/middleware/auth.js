const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // TODO: Extract and verify JWT token

  //Extract token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  //Check if token is provided
  if(!token){
    return res.status(401).json({ message: "Access denied. No token provided!" });
  }

  //Verify whether the token is valid
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err){
      return res.status(403).json({ message: "Invalid token!" });
    }
    req.user = user;
    next();
  })
};
