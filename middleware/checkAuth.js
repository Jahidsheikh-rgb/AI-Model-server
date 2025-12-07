// middleware/checkAuth.js
const checkAuth = (req, res, next) => {
  // During development, automatically assign a test user
  req.user = { email: "testuser@example.com" }; 
  next();
};

export default checkAuth;
