const logRequests = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next(); // Move to the next middleware or route handler
  };

module.exports = {logRequests}