import express from "express";
import { uploadSheets, getAllSheets, signupUser, loginUser, getAllUsers, updateUser, deleteUser, getAlldata } from "../controllers/SheetController.js";
import { verifyToken } from "../authMiddleware/authMiddleware.js";
import { Sheet } from "../models/SheetModel.js";


const router = express.Router();

router.post("/upload", verifyToken,uploadSheets);
router.get("/getallsheets",verifyToken, getAllSheets);
router.get("/getalldata", getAlldata);

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.get("/getallusers",getAllUsers)
router.put("/updateusers/:id",updateUser)
router.delete("/deleteuser/:id",deleteUser)
router.post("/getsheetsbyids", async (req, res) => {
  try {
    const { sheetIds } = req.body;
    const sheets = await Sheet.find({ _id: { $in: sheetIds } });
    res.json(sheets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sheets" });
  }
});


export default router;
