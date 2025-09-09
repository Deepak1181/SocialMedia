// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/authRoutes");
// const protectedRoutes = require("./routes/protectedRoutes");

// dotenv.config();
// const app = express();
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api", protectedRoutes);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




















// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const bcrypt = require("bcryptjs");

// dotenv.config();
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Import routes & models
// const authRoutes = require("./routes/authRoutes");
// const protectedRoutes = require("./routes/protectedRoutes");
// const User = require("./models/user");

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     createAdmin(); // Auto-create admin
//   })
//   .catch((err) => console.log("MongoDB connection error:", err));

// // Auto-create admin if not exists
// async function createAdmin() {
//   try {
//     const admin = await User.findOne({ role: "admin" });
//     if (!admin) {
//       const hashedPassword = await bcrypt.hash("admin123", 10);
//       await User.create({
//         username: "admin",
//         email: "admin@example.com",
//         password: hashedPassword,
//         role: "admin",
//         status: "Active"
//       });
//       console.log("✅ Admin created: admin@example.com / admin123");
//     } else {
//       console.log("Admin already exists");
//     }
//   } catch (error) {
//     console.log("Error creating admin:", error);
//   }
// }

// // Routes
// app.use("/api/auth", authRoutes);       // Registration/Login
// app.use("/api", protectedRoutes);      // Protected routes

// // Optional: health check
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));











// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes & models
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const User = require("./models/user");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    createAdmin(); // Auto-create admin on server start
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Auto-create admin if it doesn't exist
async function createAdmin() {
  try {
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        status: "Active"
      });
      console.log("✅ Admin created: admin@example.com / admin123");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.log("Error creating admin:", error);
  }
}

// Routes
app.use("/api/auth", authRoutes);       // Auth routes: register/login
app.use("/api", protectedRoutes);      // Protected routes

// Optional health check
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
