import express from "express";
import { uploadSheets, getAllSheets, signupUser, loginUser, getAllUsers, updateUser, deleteUser } from "../controllers/SheetController.js";
import { verifyToken } from "../authMiddleware/authMiddleware.js";


const router = express.Router();

router.post("/upload", verifyToken,uploadSheets);
router.get("/", getAllSheets);
router.post("/signup",signupUser)
router.post("/login",loginUser)
router.get("/getallusers",getAllUsers)
router.put("/updateusers/:id",updateUser)
router.delete("/deleteuser/:id",deleteUser)

export default router;
