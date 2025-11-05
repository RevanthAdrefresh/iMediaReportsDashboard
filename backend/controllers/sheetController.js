

// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import { User, Sheet } from "../models/SheetModel.js";

// // // ===== 🔐 SIGNUP =====
// // export const signupUser = async (req, res) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     if (!name || !email || !password || !role)
// //       return res.status(400).json({ message: "All fields are required" });

// //     const validRoles = ["admin", "publisher", "advertiser"];
// //     if (!validRoles.includes(role.toLowerCase()))
// //       return res.status(400).json({ message: "Invalid role" });

// //     const existing = await User.findOne({ email });
// //     if (existing) return res.status(400).json({ message: "Email already registered" });

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role: role.toLowerCase(),
// //     });
// //     await newUser.save();

// //     res.status(201).json({ message: "Signup successful", user: newUser });
// //   } catch (err) {
// //     console.error("Signup error:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // // ===== 🔑 LOGIN =====
// // export const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     if (!email || !password)
// //       return res.status(400).json({ message: "Email and password required" });

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

// //     const token = jwt.sign(
// //       { userId: user._id, role: user.role },
// //       "mySecretKey",
// //       { expiresIn: "1d" }
// //     );

// //     res.status(200).json({
// //       message: "Login successful",
// //       token,
// //       user: { id: user._id, name: user.name, email: user.email, role: user.role },
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // // ===== 🟩 UPLOAD SHEETS =====
// // export const uploadSheets = async (req, res) => {
// //   try {
// //     const { sheets } = req.body;
// //     const userRole = req.user?.role;

// //     if (!sheets || sheets.length === 0)
// //       return res.status(400).json({ message: "No sheet data provided" });

// //     if (userRole !== "admin" && userRole !== "publisher") {
// //       return res
// //         .status(403)
// //         .json({ message: "You are not authorized to upload sheets" });
// //     }

// //     const saved = await Sheet.insertMany(
// //       sheets.map((sheet) => ({
// //         ...sheet,
// //         uploadedBy: req.user.userId,
// //       }))
// //     );
// //     res.status(201).json({ message: "Data saved successfully", saved });
// //   } catch (err) {
// //     console.error("Error saving sheets:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // // ===== 🟦 GET ALL SHEETS =====
// // export const getAllSheets = async (req, res) => {
// //   try {
// //     const userRole = req.user?.role;

// //     // Advertisers can only view their own uploads
// //     if (userRole === "advertiser") {
// //       const userSheets = await Sheet.find({ uploadedBy: req.user.userId });
// //       return res.status(200).json(userSheets);
// //     }

// //     // Admin or Publisher can see all sheets
// //     const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// //     res.status(200).json(allSheets);
// //   } catch (err) {
// //     console.error("Error fetching sheets:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };


// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User, Sheet } from "../models/SheetModel.js";

// const SECRET_KEY = "mySecretKey"; // no dotenv

// // ===== 🔐 SIGNUP =====
// export const signupUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password || !role)
//       return res.status(400).json({ message: "All fields are required" });

//     const validRoles = ["admin", "publisher", "advertiser"];
//     if (!validRoles.includes(role.toLowerCase()))
//       return res.status(400).json({ message: "Invalid role" });

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role.toLowerCase(),
//     });

//     await newUser.save();

//     res.status(201).json({ message: "Signup successful", user: newUser });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ===== 🔑 LOGIN =====
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       SECRET_KEY,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ===== 🟩 UPLOAD SHEETS =====
// export const uploadSheets = async (req, res) => {
//   try {
//     const { sheets } = req.body;
//     const user = req.user; // from verifyToken middleware

//     if (!sheets || sheets.length === 0)
//       return res.status(400).json({ message: "No sheet data provided" });

//     if (user.role === "admin" || user.role === "advertiser") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to upload sheets" });
//     }

//     const savedSheets = await Sheet.insertMany(
//       sheets.map((sheet) => ({
//         ...sheet,
//         uploadedBy: user.userId,
//       }))
//     );

//     res.status(201).json({ message: "Data saved successfully", savedSheets });
//   } catch (err) {
//     console.error("Error saving sheets:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ===== 🟦 GET ALL SHEETS =====
// export const getAllSheets = async (req, res) => {
//   try {
//     const user = req.user;

//     if (user.role === "advertiser") {
//       const ownSheets = await Sheet.find({ uploadedBy: user.userId });
//       return res.status(200).json(ownSheets);
//     }

//     const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
//     res.status(200).json(allSheets);
//   } catch (err) {
//     console.error("Error fetching sheets:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Sheet } from "../models/SheetModel.js";

const SECRET_KEY = "mySecretKey"; // No dotenv

// ===== 🔐 SIGNUP =====
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    const validRoles = ["admin", "publisher", "advertiser"];
    if (!validRoles.includes(role.toLowerCase()))
      return res.status(400).json({ message: "Invalid role" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== 🔑 LOGIN =====
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== 🟩 UPLOAD SHEETS =====
export const uploadSheets = async (req, res) => {
  try {
    const { sheets } = req.body;
    const user = req.user;

    if (!sheets || sheets.length === 0)
      return res.status(400).json({ message: "No sheet data provided" });

    if (user.role !== "admin" && user.role !== "publisher") {
      return res
        .status(403)
        .json({ message: "You are not authorized to upload sheets" });
    }

    const savedSheets = await Sheet.insertMany(
      sheets.map((sheet) => ({
        ...sheet,
        uploadedBy: user.userId,
      }))
    );

    res.status(201).json({ message: "Data saved successfully", savedSheets });
  } catch (err) {
    console.error("Error saving sheets:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== 🟦 GET ALL SHEETS =====
export const getAllSheets = async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "advertiser") {
      const ownSheets = await Sheet.find({ uploadedBy: user.userId });
      return res.status(200).json(ownSheets);
    }

    const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
    res.status(200).json(allSheets);
  } catch (err) {
    console.error("Error fetching sheets:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== 👑 ADMIN: GET ALL USERS =====
export const getAllUsers = async (req, res) => {
  try {
    const user = req.user;
    // if (user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const users = await User.find({}, "-password"); // hide password
    // console.log(users);
    
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== ✏️ ADMIN: UPDATE USER =====
export const updateUser = async (req, res) => {
  try {
    const user = req.user;
    console.log(user,"userr");
    
    // if (user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { id } = req.params;
    console.log(id,"idddd");
    
    const { name, email, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: updated });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ===== 🗑️ ADMIN: DELETE USER =====
export const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    // if (user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
