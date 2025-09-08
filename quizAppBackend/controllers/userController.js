const bcrypt = require('bcryptjs');
const User = require('../models/Users'); // Import User model
const jwt = require('jsonwebtoken')
// Hash the password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare the password with the hashed password
const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};



// Signup controller
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Password complexity check
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        'INVALID_PASSWORD',
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User_Already_Exist' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    let jwt = await generateJWT(newUser)
    // Save user to the database
    await newUser.save();
    res.cookie('token', jwt, {
      httpOnly: false,
      secure: true, 
      sameSite: 'Strict', 
      maxAge: 7200000 // 2 hour
    });
    return res.status(201).json({ message: 'User_registered_successfully' });
  } catch (error) {
    console.error(error)
    let msg = error.errors.email.properties.message;
    if (msg == "INVALID_EMAIL") return res.status(500).json({ message: msg });
    return res.status(500).json({ message: 'Server error' });
  }
};

const generateJWT = async (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
}

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid_Credentials' });
    }

    // Compare the entered password with the stored password
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid_Credentials' });
    }

    // Generate a JWT token
    const jwt = await generateJWT(user)

    // Send the token in the response
    res.cookie('token', jwt, {
      httpOnly: false,
      secure: true, // true if using HTTPS
      sameSite: 'Strict', // or 'Lax'
      maxAge: 3600000 // 1 hour
    });
    return res.status(200).json({ message: "successfull" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const checkSession = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ loggedIn: true, user: decoded });
  } catch (err) {
    return res.status(200).json({ loggedIn: false });
  }
};



module.exports = { signup, login, checkSession };
