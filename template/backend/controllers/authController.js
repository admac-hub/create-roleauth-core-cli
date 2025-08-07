const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const sendVerificationEmail = require('../utils/sendVerificationEmail');

const JWT_SECRET = process.env.JWT_SECRET || '685A2ADCD85C2D8E3E3BBCE5F1C6A';

// =================== USER REGISTRATION WITH VERIFICATION ===================
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign(
      { firstName, lastName, email, password: hashedPassword, role: 'user' },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    console.log("🚀 Registering user:", email);
    await sendVerificationEmail(email, token);

    res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// =================== VENDOR REGISTRATION WITH VERIFICATION ===================
exports.registerVendor = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Vendor already exists as user' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign(
      { firstName, lastName, email, password: hashedPassword, role: 'vendor' },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    await sendVerificationEmail(email, token);

    res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// =================== EMAIL VERIFICATION ENDPOINT ===================
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, JWT_SECRET);

    const { firstName, lastName, email, password, role } = decoded;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect('http://localhost:3000/login?alreadyVerified=true');
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      isOnboarded: role === 'user',
    });

    await newUser.save();

    const authToken = jwt.sign({ id: newUser._id, role }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', authToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000,
    });

    if (role === 'vendor') {
      return res.redirect('http://localhost:3000/vendor/onboarding');
    } else {
      return res.redirect('http://localhost:3000/login');
    }
  } catch (err) {
    return res.status(400).send('Invalid or expired verification link.');
  }
};

// =================== LOGIN (USER OR VENDOR) ===================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const account = await User.findOne({ email });
    if (!account) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: account._id, role: account.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
      })
      .status(200)
      .json({
        message: 'Login successful',
        role: account.role,
        isOnboarded: account.isOnboarded,
      });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
