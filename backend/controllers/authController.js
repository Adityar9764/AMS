// backend/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { role, domain, username, password } = req.body;
  console.log("Login request:", req.body);

  try {
    // Find user based on role, username, and domain (if role is Staff)
    const user = await User.findOne({
      role,
      username,
      ...(role === "Staff" && { domain })
    });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout function (optional if JWTs are managed client-side)
export const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
