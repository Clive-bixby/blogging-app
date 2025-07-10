const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, roles: user.roles },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    config.refreshTokenSecret,
    { expiresIn: config.refreshTokenExpiresIn }
  );

  return { accessToken, refreshToken };
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Registering user with:", req.body);

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(409).json({ message: 'Username or email already exists' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    const { accessToken, refreshToken } = generateTokens(newUser);
    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      user: { id: newUser._id, username: newUser.username, email: newUser.email, roles: newUser.roles },
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({
      message: 'Registration failed',
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: { id: user._id, username: user.username, email: user.email, roles: user.roles },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.refreshAccessToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Refresh token missing' });

  try {
    const decoded = jwt.verify(token, config.refreshTokenSecret);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== token)
      return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = jwt.sign(
      { userId: user._id, roles: user.roles },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Token invalid or expired' });
  }
};
