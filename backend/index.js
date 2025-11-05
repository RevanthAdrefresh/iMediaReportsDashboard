// // import express from "express";
// // import mongoose from "mongoose";

// // const app = express();
// // app.use(express.json());

// // // MongoDB connection string (local)
// // const MONGO_URI = "mongodb://127.0.0.1:27017/imediareports";

// // // Connect to MongoDB
// // mongoose.connect(MONGO_URI)
// //   .then(() => console.log("MongoDB connected successfully"))
// //   .catch((err) => console.error("Connection error:", err));

// // app.get("/", (req, res) => {
// //   res.send("Express and MongoDB connected without dotenv!");
// // });

// // const PORT = 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// const MONGO_URI = "mongodb://127.0.0.1:27017/imediareports";
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.error("❌ Connection error:", err));

// // =====================
// // 🧩 MODEL
// // =====================
// const sheetSchema = new mongoose.Schema(
//   {
//     name: String,
//     data: [mongoose.Schema.Types.Mixed], // holds Excel JSON
//   },
//   { timestamps: true }
// );

// const Sheet = mongoose.model("Sheet", sheetSchema);

// // =====================
// // ⚙️ CONTROLLERS
// // =====================

// // Upload Excel JSON data
// app.post("/api/upload", async (req, res) => {
//   try {
//     const { sheets } = req.body;
//     if (!sheets || sheets.length === 0)
//       return res.status(400).json({ message: "No sheet data provided" });

//     // Remove old data and insert new
//     await Sheet.deleteMany({});
//     const saved = await Sheet.insertMany(sheets);
//     res.status(201).json({ message: "Data saved successfully", saved });
//   } catch (err) {
//     console.error("Error saving data:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Fetch all sheets
// app.get("/api/sheets", async (req, res) => {
//   try {
//     const allSheets = await Sheet.find();
//     res.json(allSheets);
//   } catch (err) {
//     console.error("Error fetching sheets:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // =====================
// // 🏠 ROOT
// // =====================
// app.get("/", (req, res) => res.send("✅ Express + Mongo running fine"));

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routers/SheetRoute.js"; // adjust path as needed

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb://127.0.0.1:27017/imediareports";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ Connection error:", err));

// Router Middleware
app.use("/api", router);

// Root Route
app.get("/", (req, res) => res.send("✅ Express + MongoDB connected successfully"));

// app.post("/api/signup",)

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
