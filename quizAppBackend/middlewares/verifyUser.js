const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message: 'INVALID_TOKEN' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user to request
    next(); 
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'INVALID_TOKEN' });
  }
};

module.exports = { verifyUser };
