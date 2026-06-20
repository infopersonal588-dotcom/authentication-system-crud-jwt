const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  // Debug: log incoming register payload (name, email, but not passwords in production logs)
  console.log('Register payload:', { name: req.body.name, email: req.body.email });
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Email already registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

const getUserProfile = async (req, res) => {
  const user = req.user;
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
};

const updateUserProfile = async (req, res) => {
  const user = req.user;
  const { name, email } = req.body;

  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400);
      throw new Error('Email already in use');
    }
  }

  user.name = name || user.name;
  user.email = email || user.email;
  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    createdAt: updatedUser.createdAt,
  });
};

const updateUserPassword = async (req, res) => {
  const user = req.user;
  const { currentPassword, newPassword } = req.body;

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) {
    res.status(400);
    throw new Error('Current password is incorrect');
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.json({ message: 'Password updated successfully' });
};

const deleteUserProfile = async (req, res) => {
  const user = req.user;
  await user.remove();
  res.json({ message: 'User account deleted successfully' });
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUserProfile,
};
