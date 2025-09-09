const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Authenticated users only
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "User profile info", user: req.user });
});

// Admin-only route
router.get("/admin/dashboard", authMiddleware, isAdmin, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
