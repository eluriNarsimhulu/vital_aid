const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { fullName, email, mobileNumber, password, dateOfBirth } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password Before Saving:", hashedPassword); // Debugging

    const user = await User.create({
      fullName,
      email,
      mobileNumber,
      password: hashedPassword, // ✅ Store hashed password
      dateOfBirth
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


// ✅ Login User
// const bcrypt = require('bcryptjs');


const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("🟢 Login request received for:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found in DB.");
      return res.status(401).json({ message: "Invalid credentials." });
    }

    console.log("✅ User found in DB:", user);

    // Compare passwords correctly
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Entered Password:", password);
    console.log("🔒 Stored Hashed Password:", user.password);
    console.log("✅ Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Incorrect password");
      return res.status(401).json({ message: "Invalid credentials." });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
// ✅ Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Google Login API (For React)
const googleLogin = async (req, res) => {
  try {
    const { email, fullName } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobileNumber: "",
        password: "", // Google users don't have passwords
        dateOfBirth: "",
      });
    }

    const token = generateToken(user._id);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Google login failed", error: error.message });
  }
};

// ✅ Correctly Export All Functions
module.exports = { signup, login, getUserProfile, googleLogin };
