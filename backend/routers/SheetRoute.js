import express from "express";
import {
  uploadSheets,
  getAllSheets,
  signupUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getAlldata,
  getAllGenealogySheets,
  uploadGenealogySheets,
  getLoginHistory,
  getOnlineUsers,   // ✅ NEW IMPORT
  getBlockedUsers,blockUser,unblockUser
} from "../controllers/SheetController.js";

import { verifyToken } from "../authMiddleware/authMiddleware.js";
import { Sheet } from "../models/SheetModel.js";

const router = express.Router();

// ✅ SHEET ROUTES
router.post("/upload", verifyToken, uploadSheets);
router.get("/getallsheets", verifyToken, getAllSheets);
router.get("/getalldata", getAlldata);

// ✅ AUTH ROUTES
router.post("/signup", signupUser);
router.post("/login", loginUser);

// ✅ USER ROUTES
router.get("/getallusers", getAllUsers);
router.put("/updateusers/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

// ✅ GET SPECIFIC SHEETS
router.post("/getsheetsbyids", async (req, res) => {
  try {
    const { sheetIds } = req.body;
    const sheets = await Sheet.find({ _id: { $in: sheetIds } });
    res.json(sheets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sheets" });
  }
});

// ✅ GENEALOGY ROUTES
router.post("/uploadGenealogy", verifyToken, uploadGenealogySheets);
router.get("/getgenealogyrecords", verifyToken, getAllGenealogySheets);

// ✅ LOGIN ACTIVITY ROUTE
router.get("/login-history", verifyToken, getLoginHistory);

// ✅ ✅ NEW — ONLINE STATUS ROUTE
router.get("/online-users", verifyToken, getOnlineUsers);
router.get("/blocked-users",getBlockedUsers)
router.post("/block-user/:username", verifyToken, blockUser);
router.post("/unblock-user/:username", verifyToken, unblockUser);



export default router;
