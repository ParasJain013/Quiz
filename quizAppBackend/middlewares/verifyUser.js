const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message: 'INVALID_TOKEN' });
  }
  console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded; // Attach decoded user to request
    next(); 
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'INVALID_TOKEN' });
  }
};

module.exports = { verifyUser };
