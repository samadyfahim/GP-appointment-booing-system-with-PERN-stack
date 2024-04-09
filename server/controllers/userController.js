"use strict";
const bcrypt = require("bcryptjs");
const jwtTokens = require("../utils/jwtToken");
const { User } = require("../models");

// Function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await findUserByEmail(email);
    if (userExists) {
      throw new Error("User with this email already exists");
    }
    console.log("read");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to authenticate and login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    const tokens = generateTokens(user);
    setRefreshTokenCookie(res, tokens.refreshToken);
    res.status(200).json({ ok: true, ...tokens });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update user password
exports.updatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await authenticateUser(email, oldPassword);
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword; // Changed hash_password to password
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get all users (protected route, requires authentication token)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to authenticate user by email and password
const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User does not exist");
  }
  const passwordMatch = await comparePassword(password, user.password); // Changed hash_password to password
  if (!passwordMatch) {
    throw new Error("Incorrect password");
  }
  return user;
};

// Function to generate JWT tokens for user
const generateTokens = (user) => {
  const { id, username, email } = user; // Changed userName to username
  return jwtTokens({ userId: id, username, email }); // Changed userName to username
};

// Function to set refresh token cookie
const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, { httpOnly: true });
};

// Function to find user by email
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Function to compare password with hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.create({ username, password, email });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  try {
    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user = await user.update({ username, password, email });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
