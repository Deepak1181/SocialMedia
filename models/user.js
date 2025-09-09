const mongoose = require("mongoose"); // ✅ IMPORT MONGOOSE

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, default: "Active" }
});

module.exports = mongoose.model("User", userSchema);
