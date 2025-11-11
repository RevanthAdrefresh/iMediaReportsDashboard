// // // // import bcrypt from "bcryptjs";
// // // // import jwt from "jsonwebtoken";
// // // // import { User, Sheet, GenealogySheet } from "../models/SheetModel.js";

// // // // const SECRET_KEY = "mySecretKey";

// // // // /** ---------------------- helpers (NON-BREAKING) ---------------------- **/
// // // // /** Strip any accidental metadata that might come inside row objects */
// // // // const STRIP_KEYS = new Set([
// // // //   "publisher",
// // // //   "advertiser",
// // // //   "campaign",
// // // //   "uploadedBy",
// // // //   "uploadedByName",
// // // //   "uploadTime",
// // // //   "metadata",
// // // //   "__sheetOriginalName",
// // // //   "__rowIndex",
// // // // ]);

// // // // const stripRowMeta = (row) => {
// // // //   if (!row || typeof row !== "object") return {};
// // // //   const clean = {};
// // // //   for (const k of Object.keys(row)) {
// // // //     if (!STRIP_KEYS.has(k)) clean[k] = row[k];
// // // //   }
// // // //   return clean;
// // // // };

// // // // const normalizeRows = (data) => {
// // // //   if (!Array.isArray(data)) return [];
// // // //   // Only strip for plain objects; keep arrays/numbers/strings from blowing up
// // // //   return data.map((r) => (r && typeof r === "object" && !Array.isArray(r) ? stripRowMeta(r) : r));
// // // // };
// // // // /** -------------------------------------------------------------------- **/

// // // // // ===== 🔐 SIGNUP =====
// // // // export const signupUser = async (req, res) => {
// // // //   try {
// // // //     const { name, email, password, role } = req.body;
// // // //     if (!name || !email || !password || !role)
// // // //       return res.status(400).json({ message: "All fields are required" });

// // // //     const validRoles = ["admin", "publisher", "advertiser"];
// // // //     if (!validRoles.includes(role.toLowerCase()))
// // // //       return res.status(400).json({ message: "Invalid role" });

// // // //     const existing = await User.findOne({ email });
// // // //     if (existing)
// // // //       return res.status(400).json({ message: "Email already registered" });

// // // //     const hashedPassword = await bcrypt.hash(password, 10);
// // // //     const newUser = new User({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //       role: role.toLowerCase(),
// // // //     });

// // // //     await newUser.save();
// // // //     res.status(201).json({ message: "Signup successful", user: newUser });
// // // //   } catch (err) {
// // // //     console.error("Signup error:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ===== 🔑 LOGIN =====
// // // // export const loginUser = async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;
// // // //     if (!email || !password)
// // // //       return res.status(400).json({ message: "Email and password required" });

// // // //     const user = await User.findOne({ email });
// // // //     if (!user) return res.status(404).json({ message: "User not found" });

// // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // //     if (!isMatch)
// // // //       return res.status(401).json({ message: "Invalid credentials" });

// // // //     const token = jwt.sign(
// // // //       { userId: user._id, role: user.role },
// // // //       SECRET_KEY,
// // // //       { expiresIn: "1d" }
// // // //     );

// // // //     res.status(200).json({
// // // //       message: "Login successful",
// // // //       token,
// // // //       user: {
// // // //         id: user._id,
// // // //         name: user.name,
// // // //         email: user.email,
// // // //         role: user.role,
// // // //       },
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("Login error:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ===== 🟩 UPLOAD SHEETS (Supports both flat + meta formats, NO ROW META) =====
// // // // export const uploadSheets = async (req, res) => {
// // // //   try {
// // // //     const { sheets, meta } = req.body;

// // // //     // Accept both formats: top-level or meta object
// // // //     const publisher = req.body.publisher || meta?.publisher;
// // // //     const advertiser = req.body.advertiser || meta?.advertiser;
// // // //     const campaign = req.body.campaign || meta?.campaign;
// // // //     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

// // // //     if (!sheets?.length)
// // // //       return res.status(400).json({ message: "No sheet data provided" });

// // // //     if (!publisher || !advertiser || !campaign || !uploadedBy)
// // // //       return res.status(400).json({
// // // //         message: "Missing required metadata fields",
// // // //       });

// // // //     const uploader = await User.findOne({ name: uploadedBy });
// // // //     if (!uploader)
// // // //       return res.status(404).json({
// // // //         message: `Uploader '${uploadedBy}' not found`,
// // // //       });

// // // //     const formattedSheets = sheets.map((sheet) => ({
// // // //       name: sheet.name || sheet.original || "Unknown",
// // // //       // ✅ keep rows clean even if FE sent per-row meta by mistake
// // // //       data: normalizeRows(sheet.data),
// // // //       publisher,
// // // //       advertiser,
// // // //       campaign,
// // // //       uploadedBy: uploader._id,
// // // //       uploadedByName: uploader.name, // keep your existing field
// // // //     }));

// // // //     const savedSheets = await Sheet.insertMany(formattedSheets);

// // // //     res.status(201).json({
// // // //       message: "Sheets uploaded successfully",
// // // //       savedSheets,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("Error saving sheets:", err);
// // // //     res.status(500).json({
// // // //       message: "Internal Server Error",
// // // //       error: err.message,
// // // //     });
// // // //   }
// // // // };

// // // // // ===== 🧬 UPLOAD GENEALOGY SHEETS (Supports both flat + meta formats, NO ROW META) =====
// // // // export const uploadGenealogySheets = async (req, res) => {
// // // //   try {
// // // //     const { sheets, meta } = req.body;

// // // //     const publisher = req.body.publisher || meta?.publisher;
// // // //     const advertiser = req.body.advertiser || meta?.advertiser;
// // // //     const campaign = req.body.campaign || meta?.campaign;
// // // //     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

// // // //     if (!sheets?.length)
// // // //       return res.status(400).json({ message: "No genealogy sheet data" });

// // // //     if (!publisher || !advertiser || !campaign || !uploadedBy)
// // // //       return res.status(400).json({ message: "Missing metadata" });

// // // //     const uploader = await User.findOne({ name: uploadedBy });
// // // //     if (!uploader)
// // // //       return res.status(404).json({
// // // //         message: `Uploader '${uploadedBy}' not found`,
// // // //       });

// // // //     const formattedSheets = sheets.map((sheet) => ({
// // // //       name: sheet.name || sheet.original || "Unknown",
// // // //       // ✅ keep rows clean even if FE sent per-row meta by mistake
// // // //       data: normalizeRows(sheet.data),
// // // //       publisher,
// // // //       advertiser,
// // // //       campaign,
// // // //       uploadedBy: uploader._id,
// // // //       uploadedByName: uploader.name,
// // // //     }));

// // // //     const savedGenealogySheets = await GenealogySheet.insertMany(formattedSheets);

// // // //     res.status(201).json({
// // // //       message: "Genealogy sheets uploaded successfully",
// // // //       savedGenealogySheets,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("❌ Error saving genealogy sheets:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ===== 🟦 GET ALL SHEETS =====
// // // // // export const getAllSheets = async (req, res) => {
// // // // //   try {
// // // // //     const user = req.user;

// // // // //     if (user.role === "advertiser") {
// // // // //       const ownSheets = await Sheet.find({ uploadedBy: user.userId });
// // // // //       return res.status(200).json(ownSheets);
// // // // //     }

// // // // //     const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// // // // //     res.status(200).json(allSheets);
// // // // //   } catch (err) {
// // // // //     console.error("Error fetching sheets:", err);
// // // // //     res.status(500).json({ message: "Internal Server Error" });
// // // // //   }
// // // // // };


// // // // export const getAllSheets = async (req, res) => {
// // // //   try {
// // // //     const { role, userId } = req.user;
// // // //     console.log(role,userId);
    

// // // //     if (role === "admin") {
// // // //       const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// // // //       return res.status(200).json(allSheets);
// // // //     }

// // // //     if (role === "advertiser") {
// // // //       const advertiserSheets = await Sheet.find({ uploadedBy: userId });
// // // //       return res.status(200).json(advertiserSheets);
// // // //     }

// // // //     if (role === "publisher") {
// // // //       const publisherSheets = await Sheet.find({ publisher:userId  });
// // // //       return res.status(200).json(publisherSheets);
// // // //     }
// // // //   }catch(error){
// // // // console.log(error);

// // // //   }


// // // // }
// // // // // ===== 🧬 GET ALL GENEALOGY SHEETS =====
// // // // export const getAllGenealogySheets = async (req, res) => {
// // // //   try {
// // // //     const userId = req.user?.userId || req.user?._id;
// // // //     if (!userId) {
// // // //       return res.status(401).json({ message: "Unauthorized: No user ID found" });
// // // //     }

// // // //     const userGenealogySheets = await GenealogySheet.find({ uploadedBy: userId })
// // // //       .populate("uploadedBy", "name email role");

// // // //     if (!userGenealogySheets || userGenealogySheets.length === 0) {
// // // //       return res.status(404).json({ message: "No genealogy sheets found for this user" });
// // // //     }

// // // //     res.status(200).json(userGenealogySheets);
// // // //   } catch (err) {
// // // //     console.error("❌ Error fetching user-specific genealogy sheets:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ===== 👑 ADMIN: GET ALL USERS =====
// // // // export const getAllUsers = async (req, res) => {
// // // //   try {
// // // //     const users = await User.find({}, "-password");
// // // //     res.status(200).json(users);
// // // //   } catch (err) {
// // // //     console.error("Error fetching users:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ===== ✏️ ADMIN: UPDATE USER =====
// // // // export const updateUser = async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const { name, email, role } = req.body;

// // // //     const updated = await User.findByIdAndUpdate(
// // // //       id,
// // // //       { name, email, role },
// // // //       { new: true }
// // // //     ).select("-password");

// // // //     if (!updated) return res.status(404).json({ message: "User not found" });

// // // //     res.status(200).json({ message: "User updated successfully", user: updated });
// // // //   } catch (err) {
// // // //     console.error("Error updating user:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ===== 🗑️ ADMIN: DELETE USER =====
// // // // export const deleteUser = async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const deleted = await User.findByIdAndDelete(id);

// // // //     if (!deleted) return res.status(404).json({ message: "User not found" });

// // // //     res.status(200).json({ message: "User deleted successfully" });
// // // //   } catch (err) {
// // // //     console.error("Error deleting user:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ===== 📂 GET ALL DATA (Sheets + Genealogy) =====
// // // // export const getAlldata = async (req, res) => {
// // // //   try {
// // // //     const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// // // //     const allGenealogy = await GenealogySheet.find().populate(
// // // //       "uploadedBy",
// // // //       "name email role"
// // // //     );

// // // //     res.status(200).json({
// // // //       message: "Fetched all uploaded data",
// // // //       totalSheets: allSheets.length,
// // // //       totalGenealogy: allGenealogy.length,
// // // //       sheets: allSheets,
// // // //       genealogySheets: allGenealogy,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("Error fetching all data:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };


// // // // import bcrypt from "bcryptjs";
// // // // import jwt from "jsonwebtoken";
// // // // import { User, Sheet, GenealogySheet, LoginActivity } from "../models/SheetModel.js";

// // // // const SECRET_KEY = "mySecretKey";

// // // // const STRIP_KEYS = new Set([
// // // //   "publisher",
// // // //   "advertiser",
// // // //   "campaign",
// // // //   "uploadedBy",
// // // //   "uploadedByName",
// // // //   "uploadTime",
// // // //   "metadata",
// // // //   "__sheetOriginalName",
// // // //   "__rowIndex",
// // // // ]);

// // // // const stripRowMeta = (row) => {
// // // //   if (!row || typeof row !== "object") return {};
// // // //   const clean = {};
// // // //   for (const k of Object.keys(row)) {
// // // //     if (!STRIP_KEYS.has(k)) clean[k] = row[k];
// // // //   }
// // // //   return clean;
// // // // };

// // // // const normalizeRows = (data) => {
// // // //   if (!Array.isArray(data)) return [];
// // // //   return data.map((r) => (r && typeof r === "object" && !Array.isArray(r) ? stripRowMeta(r) : r));
// // // // };

// // // // // ===== 🔐 SIGNUP =====
// // // // export const signupUser = async (req, res) => {
// // // //   try {
// // // //     const { name, email, password, role } = req.body;
// // // //     if (!name || !email || !password || !role)
// // // //       return res.status(400).json({ message: "All fields are required" });

// // // //     const validRoles = ["admin", "publisher", "advertiser"];
// // // //     if (!validRoles.includes(role.toLowerCase()))
// // // //       return res.status(400).json({ message: "Invalid role" });

// // // //     const existing = await User.findOne({ email });
// // // //     if (existing)
// // // //       return res.status(400).json({ message: "Email already registered" });

// // // //     const hashedPassword = await bcrypt.hash(password, 10);
// // // //     const newUser = new User({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //       role: role.toLowerCase(),
// // // //     });

// // // //     await newUser.save();
// // // //     res.status(201).json({ message: "Signup successful", user: newUser });
// // // //   } catch (err) {
// // // //     console.error("Signup error:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ===== 🔑 LOGIN =====
// // // // export const loginUser = async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;

// // // //     if (!email || !password)
// // // //       return res.status(400).json({ message: "Email and password required" });

// // // //     const user = await User.findOne({ email });
// // // //     if (!user) {
// // // //       // record failed attempt
// // // //       await recordFailedAttempt(email, req);
// // // //       return res.status(404).json({ message: "User not found" });
// // // //     }

// // // //     // check if user is temporarily blocked
// // // //     const failedUser = await FailedAttempt.findOne({ username: user.name });
// // // //     if (failedUser && failedUser.blocked === true) {
// // // //       return res.status(403).json({ message: "Account temporarily blocked due to too many attempts" });
// // // //     }

// // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // //     if (!isMatch) {
// // // //       // record failed attempt
// // // //       await recordFailedAttempt(user.name, req);
// // // //       return res.status(401).json({ message: "Invalid credentials" });
// // // //     }

// // // //     // ✅ record successful login
// // // //     await LoginHistory.create({
// // // //       userId: user._id,
// // // //       username: user.name,
// // // //       action: "login_success",
// // // //       ipAddress: req.ip,
// // // //       browser: req.headers["user-agent"],
// // // //     });

// // // //     // ✅ reset failed attempts
// // // //     if (failedUser) {
// // // //       failedUser.attempts = 0;
// // // //       failedUser.blocked = false;
// // // //       await failedUser.save();
// // // //     }

// // // //     const token = jwt.sign(
// // // //       { userId: user._id, role: user.role },
// // // //       SECRET_KEY,
// // // //       { expiresIn: "1d" }
// // // //     );

// // // //     res.status(200).json({
// // // //       message: "Login successful",
// // // //       token,
// // // //       user: {
// // // //         id: user._id,
// // // //         name: user.name,
// // // //         email: user.email,
// // // //         role: user.role,
// // // //       },
// // // //     });

// // // //   } catch (err) {
// // // //     console.error("Login error:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };


// // // // // ✅ EVERYTHING ELSE IS UNTOUCHED BELOW

// // // // export const uploadSheets = async (req, res) => {
// // // //   try {
// // // //     const { sheets, meta } = req.body;

// // // //     const publisher = req.body.publisher || meta?.publisher;
// // // //     const advertiser = req.body.advertiser || meta?.advertiser;
// // // //     const campaign = req.body.campaign || meta?.campaign;
// // // //     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

// // // //     if (!sheets?.length)
// // // //       return res.status(400).json({ message: "No sheet data provided" });

// // // //     if (!publisher || !advertiser || !campaign || !uploadedBy)
// // // //       return res.status(400).json({
// // // //         message: "Missing required metadata fields",
// // // //       });

// // // //     const uploader = await User.findOne({ name: uploadedBy });
// // // //     if (!uploader)
// // // //       return res.status(404).json({
// // // //         message: `Uploader '${uploadedBy}' not found`,
// // // //       });

// // // //     const formattedSheets = sheets.map((sheet) => ({
// // // //       name: sheet.name || sheet.original || "Unknown",
// // // //       data: normalizeRows(sheet.data),
// // // //       publisher,
// // // //       advertiser,
// // // //       campaign,
// // // //       uploadedBy: uploader._id,
// // // //       uploadedByName: uploader.name,
// // // //     }));

// // // //     const savedSheets = await Sheet.insertMany(formattedSheets);

// // // //     res.status(201).json({
// // // //       message: "Sheets uploaded successfully",
// // // //       savedSheets,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("Error saving sheets:", err);
// // // //     res.status(500).json({
// // // //       message: "Internal Server Error",
// // // //       error: err.message,
// // // //     });
// // // //   }
// // // // };

// // // // export const uploadGenealogySheets = async (req, res) => {
// // // //   try {
// // // //     const { sheets, meta } = req.body;

// // // //     const publisher = req.body.publisher || meta?.publisher;
// // // //     const advertiser = req.body.advertiser || meta?.advertiser;
// // // //     const campaign = req.body.campaign || meta?.campaign;
// // // //     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

// // // //     if (!sheets?.length)
// // // //       return res.status(400).json({ message: "No genealogy sheet data" });

// // // //     if (!publisher || !advertiser || !campaign || !uploadedBy)
// // // //       return res.status(400).json({ message: "Missing metadata" });

// // // //     const uploader = await User.findOne({ name: uploadedBy });
// // // //     if (!uploader)
// // // //       return res.status(404).json({
// // // //         message: `Uploader '${uploadedBy}' not found`,
// // // //       });

// // // //     const formattedSheets = sheets.map((sheet) => ({
// // // //       name: sheet.name || sheet.original || "Unknown",
// // // //       data: normalizeRows(sheet.data),
// // // //       publisher,
// // // //       advertiser,
// // // //       campaign,
// // // //       uploadedBy: uploader._id,
// // // //       uploadedByName: uploader.name,
// // // //     }));

// // // //     const savedGenealogySheets = await GenealogySheet.insertMany(formattedSheets);

// // // //     res.status(201).json({
// // // //       message: "Genealogy sheets uploaded successfully",
// // // //       savedGenealogySheets,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("❌ Error saving genealogy sheets:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ✅ ROLE-BASED SHEET FETCH
// // // // export const getAllSheets = async (req, res) => {
// // // //   try {
// // // //     const { role, userId } = req.user;

// // // //     if (role === "admin") {
// // // //       const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// // // //       return res.status(200).json(allSheets);
// // // //     }

// // // //     if (role === "advertiser") {
// // // //       const advertiserSheets = await Sheet.find({ uploadedBy: userId });
// // // //       return res.status(200).json(advertiserSheets);
// // // //     }

// // // //     if (role === "publisher") {
// // // //       const publisherSheets = await Sheet.find({ publisher: userId });
// // // //       return res.status(200).json(publisherSheets);
// // // //     }
// // // //   } catch (error) {
// // // //     console.log(error);
// // // //   }
// // // // };

// // // // // ✅ GENEALOGY SHEET FETCH
// // // // export const getAllGenealogySheets = async (req, res) => {
// // // //   try {
// // // //     const userId = req.user?.userId || req.user?._id;
// // // //     if (!userId) {
// // // //       return res.status(401).json({ message: "Unauthorized: No user ID found" });
// // // //     }

// // // //     const userGenealogySheets = await GenealogySheet.find({ uploadedBy: userId })
// // // //       .populate("uploadedBy", "name email role");

// // // //     if (!userGenealogySheets || userGenealogySheets.length === 0) {
// // // //       return res.status(404).json({ message: "No genealogy sheets found for this user" });
// // // //     }

// // // //     res.status(200).json(userGenealogySheets);
// // // //   } catch (err) {
// // // //     console.error("❌ Error fetching user-specific genealogy sheets:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ✅ GET ALL USERS
// // // // export const getAllUsers = async (req, res) => {
// // // //   try {
// // // //     const users = await User.find({}, "-password");
// // // //     res.status(200).json(users);
// // // //   } catch (err) {
// // // //     console.error("Error fetching users:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ✅ UPDATE USER
// // // // export const updateUser = async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const { name, email, role } = req.body;

// // // //     const updated = await User.findByIdAndUpdate(
// // // //       id,
// // // //       { name, email, role },
// // // //       { new: true }
// // // //     ).select("-password");

// // // //     if (!updated) return res.status(404).json({ message: "User not found" });

// // // //     res.status(200).json({ message: "User updated successfully", user: updated });
// // // //   } catch (err) {
// // // //     console.error("Error updating user:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ✅ DELETE USER
// // // // export const deleteUser = async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const deleted = await User.findByIdAndDelete(id);

// // // //     if (!deleted) return res.status(404).json({ message: "User not found" });

// // // //     res.status(200).json({ message: "User deleted successfully" });
// // // //   } catch (err) {
// // // //     console.error("Error deleting user:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // export const getAlldata = async (req, res) => {
// // // //   try {
// // // //     const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// // // //     const allGenealogy = await GenealogySheet.find().populate(
// // // //       "uploadedBy",
// // // //       "name email role"
// // // //     );

// // // //     res.status(200).json({
// // // //       message: "Fetched all uploaded data",
// // // //       totalSheets: allSheets.length,
// // // //       totalGenealogy: allGenealogy.length,
// // // //       sheets: allSheets,
// // // //       genealogySheets: allGenealogy,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("Error fetching all data:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };

// // // // // ✅ NEW API — Return Login History
// // // // // ✅ GET LOGIN ACTIVITY
// // // // export const getLoginHistory = async (req, res) => {
// // // //   try {
// // // //     const logs = await LoginActivity.find()
// // // //       .sort({ timestamp: -1 })
// // // //       .lean();

// // // //     res.status(200).json({ logs });
// // // //   } catch (err) {
// // // //     console.error("Error fetching login history:", err);
// // // //     res.status(500).json({ message: "Internal Server Error" });
// // // //   }
// // // // };



// // // import bcrypt from "bcryptjs";
// // // import jwt from "jsonwebtoken";
// // // import { User, Sheet, GenealogySheet, LoginActivity } from "../models/SheetModel.js";

// // // const SECRET_KEY = "mySecretKey";

// // // /* ---------------------- HELPERS ---------------------- */

// // // const STRIP_KEYS = new Set([
// // //   "publisher",
// // //   "advertiser",
// // //   "campaign",
// // //   "uploadedBy",
// // //   "uploadedByName",
// // //   "uploadTime",
// // //   "metadata",
// // //   "__sheetOriginalName",
// // //   "__rowIndex",
// // // ]);

// // // const stripRowMeta = (row) => {
// // //   if (!row || typeof row !== "object") return {};
// // //   const clean = {};
// // //   for (const k of Object.keys(row)) {
// // //     if (!STRIP_KEYS.has(k)) clean[k] = row[k];
// // //   }
// // //   return clean;
// // // };

// // // const normalizeRows = (data) => {
// // //   if (!Array.isArray(data)) return [];
// // //   return data.map((r) =>
// // //     r && typeof r === "object" && !Array.isArray(r) ? stripRowMeta(r) : r
// // //   );
// // // };

// // // /* ---------------------- LOGIN ACTIVITY HELPERS ---------------------- */

// // // const recordSuccessLogin = async (user, req) => {
// // //   try {
// // //     await LoginActivity.create({
// // //       userId: user._id,
// // //       username: user.name,
// // //       action: "login_success",
// // //       ipAddress: req.ip,
// // //       browser: req.headers["user-agent"],
// // //     });
// // //   } catch (err) {
// // //     console.log("⚠️ Couldn't save login success log:", err.message);
// // //   }
// // // };

// // // const recordFailedLogin = async (username, req) => {
// // //   try {
// // //     await LoginActivity.create({
// // //       username: username || "unknown",
// // //       action: "login_failed",
// // //       ipAddress: req.ip,
// // //       browser: req.headers["user-agent"],
// // //     });
// // //   } catch (err) {
// // //     console.log("⚠️ Couldn't save failed login log:", err.message);
// // //   }
// // // };

// // // /* ---------------------- AUTH ---------------------- */

// // // // ✅ SIGNUP
// // // export const signupUser = async (req, res) => {
// // //   try {
// // //     const { name, email, password, role } = req.body;

// // //     if (!name || !email || !password || !role)
// // //       return res.status(400).json({ message: "All fields are required" });

// // //     const validRoles = ["admin", "publisher", "advertiser"];
// // //     if (!validRoles.includes(role.toLowerCase()))
// // //       return res.status(400).json({ message: "Invalid role" });

// // //     const existing = await User.findOne({ email });
// // //     if (existing)
// // //       return res.status(400).json({ message: "Email already registered" });

// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     const newUser = new User({
// // //       name,
// // //       email,
// // //       password: hashedPassword,
// // //       role: role.toLowerCase(),
// // //     });

// // //     await newUser.save();

// // //     res.status(201).json({
// // //       message: "Signup successful",
// // //       user: newUser,
// // //     });
// // //   } catch (err) {
// // //     console.error("Signup error:", err);
// // //     res.status(500).json({ message: "Internal Server Error" });
// // //   }
// // // };

// // // // ✅ LOGIN
// // // export const loginUser = async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     if (!email || !password)
// // //       return res.status(400).json({ message: "Email and password required" });

// // //     const user = await User.findOne({ email });
// // //     if (!user) {
// // //       await recordFailedLogin(email, req);
// // //       return res.status(404).json({ message: "User not found" });
// // //     }

// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) {
// // //       await recordFailedLogin(user.name, req);
// // //       return res.status(401).json({ message: "Invalid credentials" });
// // //     }

// // //     await recordSuccessLogin(user, req);

// // //     const token = jwt.sign(
// // //       { userId: user._id, role: user.role },
// // //       SECRET_KEY,
// // //       { expiresIn: "1d" }
// // //     );

// // //     res.status(200).json({
// // //       message: "Login successful",
// // //       token,
// // //       user: {
// // //         id: user._id,
// // //         name: user.name,
// // //         email: user.email,
// // //         role: user.role,
// // //       },
// // //     });
// // //   } catch (err) {
// // //     console.error("Login error:", err);
// // //     res.status(500).json({ message: "Internal Server Error" });
// // //   }
// // // };

// // // /* ---------------------- SHEETS UPLOAD (UNCHANGED LOGIC) ---------------------- */

// // // export const uploadSheets = async (req, res) => {
// // //   try {
// // //     const { sheets, meta } = req.body;

// // //     const publisher = req.body.publisher || meta?.publisher;
// // //     const advertiser = req.body.advertiser || meta?.advertiser;
// // //     const campaign = req.body.campaign || meta?.campaign;
// // //     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

// // //     if (!sheets?.length)
// // //       return res.status(400).json({ message: "No sheet data provided" });

// // //     if (!publisher || !advertiser || !campaign || !uploadedBy)
// // //       return res.status(400).json({ message: "Missing required metadata fields" });

// // //     const uploader = await User.findOne({ name: uploadedBy });
// // //     if (!uploader)
// // //       return res.status(404).json({ message: `Uploader '${uploadedBy}' not found` });

// // //     const formattedSheets = sheets.map((sheet) => ({
// // //       name: sheet.name || sheet.original || "Unknown",
// // //       data: normalizeRows(sheet.data),
// // //       publisher,
// // //       advertiser,
// // //       campaign,
// // //       uploadedBy: uploader._id,
// // //       uploadedByName: uploader.name,
// // //     }));

// // //     const savedSheets = await Sheet.insertMany(formattedSheets);

// // //     res.status(201).json({
// // //       message: "Sheets uploaded successfully",
// // //       savedSheets,
// // //     });
// // //   } catch (err) {
// // //     console.error("Error saving sheets:", err);
// // //     res.status(500).json({
// // //       message: "Internal Server Error",
// // //       error: err.message,
// // //     });
// // //   }
// // // };

// // // /* ---------------------- GENEALOGY (UNCHANGED LOGIC) ---------------------- */

// // // export const uploadGenealogySheets = async (req, res) => {
// // //   try {
// // //     const { sheets, meta } = req.body;

// // //     const publisher = req.body.publisher || meta?.publisher;
// // //     const advertiser = req.body.advertiser || meta?.advertiser;
// // //     const campaign = req.body.campaign || meta?.campaign;
// // //     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

// // //     if (!sheets?.length)
// // //       return res.status(400).json({ message: "No genealogy sheet data" });

// // //     if (!publisher || !advertiser || !campaign || !uploadedBy)
// // //       return res.status(400).json({ message: "Missing metadata" });

// // //     const uploader = await User.findOne({ name: uploadedBy });
// // //     if (!uploader)
// // //       return res.status(404).json({ message: `Uploader '${uploadedBy}' not found` });

// // //     const formattedSheets = sheets.map((sheet) => ({
// // //       name: sheet.name || sheet.original || "Unknown",
// // //       data: normalizeRows(sheet.data),
// // //       publisher,
// // //       advertiser,
// // //       campaign,
// // //       uploadedBy: uploader._id,
// // //       uploadedByName: uploader.name,
// // //     }));

// // //     const savedGenealogySheets = await GenealogySheet.insertMany(formattedSheets);

// // //     res.status(201).json({
// // //       message: "Genealogy sheets uploaded successfully",
// // //       savedGenealogySheets,
// // //     });
// // //   } catch (err) {
// // //     console.error("❌ Error saving genealogy sheets:", err);
// // //     res.status(500).json({ message: "Internal Server Error" });
// // //   }
// // // };

// // // /* ---------------------- GET ALL SHEETS (UNCHANGED LOGIC) ---------------------- */

// // // export const getAllSheets = async (req, res) => {
// // //   try {
// // //     const { role, userId } = req.user;

// // //     if (role === "admin") {
// // //       const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// // //       return res.status(200).json(allSheets);
// // //     }

// // //     if (role === "advertiser") {
// // //       const advertiserSheets = await Sheet.find({ uploadedBy: userId });
// // //       return res.status(200).json(advertiserSheets);
// // //     }

// // //     if (role === "publisher") {
// // //       const publisherSheets = await Sheet.find({ publisher: userId });
// // //       return res.status(200).json(publisherSheets);
// // //     }
// // //   } catch (error) {
// // //     console.log(error);
// // //   }
// // // };

// // // /* ---------------------- GENEALOGY FETCH (UNCHANGED) ---------------------- */

// // // export const getAllGenealogySheets = async (req, res) => {
// // //   try {
// // //     const userId = req.user?.userId || req.user?._id;

// // //     const userSheets = await GenealogySheet.find({ uploadedBy: userId })
// // //       .populate("uploadedBy", "name email role");

// // //     if (!userSheets.length)
// // //       return res.status(404).json({ message: "No genealogy sheets found" });

// // //     res.status(200).json(userSheets);
// // //   } catch (err) {
// // //     console.error("❌ Error fetching genealogy:", err);
// // //     res.status(500).json({ message: "Internal Server Error" });
// // //   }
// // // };

// // // /* ---------------------- USER CRUD (UNCHANGED LOGIC) ---------------------- */

// // // export const getAllUsers = async (req, res) => {
// // //   try {
// // //     const users = await User.find({}, "-password");
// // //     res.status(200).json(users);
// // //   } catch (err) {
// // //     console.error("Error fetching users:", err);
// // //     res.status(500).json({ message: "Internal Server Error" });
// // //   }
// // // };

// // // export const updateUser = async (req, res) => {
// // //   try {
// // //     const updated = await User.findByIdAndUpdate(
// // //       req.params.id,
// // //       req.body,
// // //       { new: true }
// // //     ).select("-password");

// // //     if (!updated) return res.status(404).json({ message: "User not found" });

// // //     res.status(200).json({ message: "User updated successfully", user: updated });
// // //   } catch (err) {
// // //     console.error("Error updating user:", err);
// // //     res.status(500).json({ message: "Internal Server Error" });
// // //   }
// // // };

// // // export const deleteUser = async (req, res) => {
// // //   try {
// // //     const deleted = await User.findByIdAndDelete(req.params.id);
// // //     if (!deleted) return res.status(404).json({ message: "User not found" });

// // //     res.status(200).json({ message: "User deleted successfully" });
// // //   } catch (err) {
// // //     console.error("Error deleting user:", err);
// // //     res.status(500).json({ message: "Internal Server Error" });
// // //   }
// // // };

// // // /* ---------------------- FETCH ALL DATA (UNCHANGED LOGIC) ---------------------- */

// // // export const getAlldata = async (req, res) => {
// // //   try {
// // //     const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// // //     const allGenealogy = await GenealogySheet.find().populate(
// // //       "uploadedBy",
// // //       "name email role"
// // //     );

// // //     res.status(200).json({
// // //       message: "Fetched all uploaded data",
// // //       totalSheets: allSheets.length,
// // //       totalGenealogy: allGenealogy.length,
// // //       sheets: allSheets,
// // //       genealogySheets: allGenealogy,
// // //     });
// // //   } catch (err) {
// // //     console.error("Error fetching all data:", err);
// // //     res.status(500).json({ message: "Internal Server Error" });
// // //   }
// // // };

// // // /* ---------------------- LOGIN HISTORY (NEW) ---------------------- */

// // // export const getLoginHistory = async (req, res) => {
// // //   try {
// // //     const logs = await LoginActivity.find().sort({ timestamp: -1 }).lean();
// // //     res.status(200).json({ logs });
// // //   } catch (err) {
// // //     console.error("❌ Error fetching login history:", err);
// // //     res.status(500).json({ message: "Internal Server Error" });
// // //   }
// // // };


// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import { User, Sheet, GenealogySheet, LoginActivity } from "../models/SheetModel.js";

// // const SECRET_KEY = "mySecretKey";

// // /* ---------------------- HELPERS ---------------------- */

// // const STRIP_KEYS = new Set([
// //   "publisher",
// //   "advertiser",
// //   "campaign",
// //   "uploadedBy",
// //   "uploadedByName",
// //   "uploadTime",
// //   "metadata",
// //   "__sheetOriginalName",
// //   "__rowIndex",
// // ]);

// // const stripRowMeta = (row) => {
// //   if (!row || typeof row !== "object") return {};
// //   const clean = {};
// //   for (const k of Object.keys(row)) {
// //     if (!STRIP_KEYS.has(k)) clean[k] = row[k];
// //   }
// //   return clean;
// // };

// // const normalizeRows = (data) => {
// //   if (!Array.isArray(data)) return [];
// //   return data.map((r) =>
// //     r && typeof r === "object" && !Array.isArray(r) ? stripRowMeta(r) : r
// //   );
// // };

// // /* ---------------------- LOGIN ACTIVITY HELPERS ---------------------- */

// // const recordSuccessLogin = async (user, req) => {
// //   try {
// //     await LoginActivity.create({
// //       userId: user._id,
// //       username: user.name,
// //       action: "login_success",
// //       ipAddress: req.ip,
// //       browser: req.headers["user-agent"],
// //     });
// //   } catch (err) {
// //     console.log("⚠️ Couldn't save login success log:", err.message);
// //   }
// // };

// // const recordFailedLogin = async (username, req) => {
// //   try {
// //     await LoginActivity.create({
// //       username: username || "unknown",
// //       action: "login_failed",
// //       ipAddress: req.ip,
// //       browser: req.headers["user-agent"],
// //     });
// //   } catch (err) {
// //     console.log("⚠️ Couldn't save failed login log:", err.message);
// //   }
// // };

// // /* ---------------------- AUTH ---------------------- */

// // // ✅ SIGNUP (UNCHANGED)
// // export const signupUser = async (req, res) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     if (!name || !email || !password || !role)
// //       return res.status(400).json({ message: "All fields are required" });

// //     const validRoles = ["admin", "publisher", "advertiser"];
// //     if (!validRoles.includes(role.toLowerCase()))
// //       return res.status(400).json({ message: "Invalid role" });

// //     const existing = await User.findOne({ email });
// //     if (existing)
// //       return res.status(400).json({ message: "Email already registered" });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role: role.toLowerCase(),
// //     });

// //     await newUser.save();

// //     res.status(201).json({
// //       message: "Signup successful",
// //       user: newUser,
// //     });
// //   } catch (err) {
// //     console.error("Signup error:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // /* ---------------------- LOGIN (UPDATED WITH NEW ONLINE STATUS) ---------------------- */

// // export const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password)
// //       return res.status(400).json({ message: "Email and password required" });

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       await recordFailedLogin(email, req);
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       await recordFailedLogin(user.name, req);
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     await recordSuccessLogin(user, req);

// //     /* ✅ NEW: Set online status + last active */
// //     user.isOnline = true;
// //     user.lastActive = new Date();
// //     await user.save();

// //     const token = jwt.sign(
// //       { userId: user._id, role: user.role },
// //       SECRET_KEY,
// //       { expiresIn: "1d" }
// //     );

// //     res.status(200).json({
// //       message: "Login successful",
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //         isOnline: true, // ✅ NEW
// //         lastActive: user.lastActive,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // /* ---------------------- SHEETS UPLOAD (UNCHANGED) ---------------------- */

// // export const uploadSheets = async (req, res) => {
// //   try {
// //     const { sheets, meta } = req.body;

// //     const publisher = req.body.publisher || meta?.publisher;
// //     const advertiser = req.body.advertiser || meta?.advertiser;
// //     const campaign = req.body.campaign || meta?.campaign;
// //     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

// //     if (!sheets?.length)
// //       return res.status(400).json({ message: "No sheet data provided" });

// //     if (!publisher || !advertiser || !campaign || !uploadedBy)
// //       return res.status(400).json({ message: "Missing required metadata fields" });

// //     const uploader = await User.findOne({ name: uploadedBy });
// //     if (!uploader)
// //       return res.status(404).json({ message: `Uploader '${uploadedBy}' not found` });

// //     const formattedSheets = sheets.map((sheet) => ({
// //       name: sheet.name || sheet.original || "Unknown",
// //       data: normalizeRows(sheet.data),
// //       publisher,
// //       advertiser,
// //       campaign,
// //       uploadedBy: uploader._id,
// //       uploadedByName: uploader.name,
// //     }));

// //     const savedSheets = await Sheet.insertMany(formattedSheets);

// //     res.status(201).json({
// //       message: "Sheets uploaded successfully",
// //       savedSheets,
// //     });
// //   } catch (err) {
// //     console.error("Error saving sheets:", err);
// //     res.status(500).json({
// //       message: "Internal Server Error",
// //       error: err.message,
// //     });
// //   }
// // };

// // /* ---------------------- GENEALOGY UPLOAD (UNCHANGED) ---------------------- */

// // export const uploadGenealogySheets = async (req, res) => {
// //   try {
// //     const { sheets, meta } = req.body;

// //     const publisher = req.body.publisher || meta?.publisher;
// //     const advertiser = req.body.advertiser || meta?.advertiser;
// //     const campaign = req.body.campaign || meta?.campaign;
// //     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

// //     if (!sheets?.length)
// //       return res.status(400).json({ message: "No genealogy sheet data" });

// //     if (!publisher || !advertiser || !campaign || !uploadedBy)
// //       return res.status(400).json({ message: "Missing metadata" });

// //     const uploader = await User.findOne({ name: uploadedBy });
// //     if (!uploader)
// //       return res.status(404).json({ message: `Uploader '${uploadedBy}' not found` });

// //     const formattedSheets = sheets.map((sheet) => ({
// //       name: sheet.name || sheet.original || "Unknown",
// //       data: normalizeRows(sheet.data),
// //       publisher,
// //       advertiser,
// //       campaign,
// //       uploadedBy: uploader._id,
// //       uploadedByName: uploader.name,
// //     }));

// //     const savedGenealogySheets = await GenealogySheet.insertMany(formattedSheets);

// //     res.status(201).json({
// //       message: "Genealogy sheets uploaded successfully",
// //       savedGenealogySheets,
// //     });
// //   } catch (err) {
// //     console.error("❌ Error saving genealogy sheets:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // /* ---------------------- SHEET LIST FETCH (UPDATED WITH ONLINE STATUS) ---------------------- */

// // export const getAllSheets = async (req, res) => {
// //   try {
// //     const { role, userId } = req.user;

// //     /* ✅ NEW: Update user activity */
// //     await User.findByIdAndUpdate(userId, {
// //       isOnline: true,
// //       lastActive: new Date(),
// //     });

// //     if (role === "admin") {
// //       const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// //       return res.status(200).json(allSheets);
// //     }

// //     if (role === "advertiser") {
// //       const advertiserSheets = await Sheet.find({ uploadedBy: userId });
// //       return res.status(200).json(advertiserSheets);
// //     }

// //     if (role === "publisher") {
// //       const publisherSheets = await Sheet.find({ publisher: userId });
// //       return res.status(200).json(publisherSheets);
// //     }
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // /* ---------------------- GENEALOGY FETCH (UNCHANGED) ---------------------- */

// // export const getAllGenealogySheets = async (req, res) => {
// //   try {
// //     const userId = req.user?.userId || req.user?._id;

// //     const userSheets = await GenealogySheet.find({ uploadedBy: userId })
// //       .populate("uploadedBy", "name email role");

// //     if (!userSheets.length)
// //       return res.status(404).json({ message: "No genealogy sheets found" });

// //     res.status(200).json(userSheets);
// //   } catch (err) {
// //     console.error("❌ Error fetching genealogy:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // /* ---------------------- USER CRUD (UNCHANGED) ---------------------- */

// // export const getAllUsers = async (req, res) => {
// //   try {
// //     const users = await User.find({}, "-password");
// //     res.status(200).json(users);
// //   } catch (err) {
// //     console.error("Error fetching users:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // export const updateUser = async (req, res) => {
// //   try {
// //     const updated = await User.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     ).select("-password");

// //     if (!updated) return res.status(404).json({ message: "User not found" });

// //     res.status(200).json({ message: "User updated successfully", user: updated });
// //   } catch (err) {
// //     console.error("Error updating user:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // export const deleteUser = async (req, res) => {
// //   try {
// //     const deleted = await User.findByIdAndDelete(req.params.id);
// //     if (!deleted) return res.status(404).json({ message: "User not found" });

// //     res.status(200).json({ message: "User deleted successfully" });
// //   } catch (err) {
// //     console.error("Error deleting user:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // /* ---------------------- FETCH ALL DATA (UNCHANGED) ---------------------- */

// // export const getAlldata = async (req, res) => {
// //   try {
// //     const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
// //     const allGenealogy = await GenealogySheet.find().populate(
// //       "uploadedBy",
// //       "name email role"
// //     );

// //     res.status(200).json({
// //       message: "Fetched all uploaded data",
// //       totalSheets: allSheets.length,
// //       totalGenealogy: allGenealogy.length,
// //       sheets: allSheets,
// //       genealogySheets: allGenealogy,
// //     });
// //   } catch (err) {
// //     console.error("Error fetching all data:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // /* ---------------------- LOGIN HISTORY (UNCHANGED) ---------------------- */

// // export const getLoginHistory = async (req, res) => {
// //   try {
// //     const logs = await LoginActivity.find().sort({ timestamp: -1 }).lean();
// //     res.status(200).json({ logs });
// //   } catch (err) {
// //     console.error("❌ Error fetching login history:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };


// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User, Sheet, GenealogySheet, LoginActivity } from "../models/SheetModel.js";

// const SECRET_KEY = "mySecretKey";

// /* ---------------------- HELPERS ---------------------- */

// const STRIP_KEYS = new Set([
//   "publisher",
//   "advertiser",
//   "campaign",
//   "uploadedBy",
//   "uploadedByName",
//   "uploadTime",
//   "metadata",
//   "__sheetOriginalName",
//   "__rowIndex",
// ]);

// const stripRowMeta = (row) => {
//   if (!row || typeof row !== "object") return {};
//   const clean = {};
//   for (const k of Object.keys(row)) {
//     if (!STRIP_KEYS.has(k)) clean[k] = row[k];
//   }
//   return clean;
// };

// const normalizeRows = (data) => {
//   if (!Array.isArray(data)) return [];
//   return data.map((r) =>
//     r && typeof r === "object" && !Array.isArray(r) ? stripRowMeta(r) : r
//   );
// };

// /* ---------------------- LOGIN ACTIVITY HELPERS ---------------------- */

// const recordSuccessLogin = async (user, req) => {
//   try {
//     await LoginActivity.create({
//       userId: user._id,
//       username: user.name,
//       action: "login_success",
//       ipAddress: req.ip,
//       browser: req.headers["user-agent"],
//     });
//   } catch (err) {
//     console.log("⚠️ Couldn't save login success log:", err.message);
//   }
// };

// const recordFailedLogin = async (username, req) => {
//   try {
//     await LoginActivity.create({
//       username: username || "unknown",
//       action: "login_failed",
//       ipAddress: req.ip,
//       browser: req.headers["user-agent"],
//     });
//   } catch (err) {
//     console.log("⚠️ Couldn't save failed login log:", err.message);
//   }
// };

// /* ---------------------- AUTH ---------------------- */

// // ✅ SIGNUP (UNCHANGED)
// export const signupUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password || !role)
//       return res.status(400).json({ message: "All fields are required" });

//     const validRoles = ["admin", "publisher", "advertiser"];
//     if (!validRoles.includes(role.toLowerCase()))
//       return res.status(400).json({ message: "Invalid role" });

//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role.toLowerCase(),
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: "Signup successful",
//       user: newUser,
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// /* ---------------------- LOGIN (UPDATED WITH NEW ONLINE STATUS) ---------------------- */

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password required" });

//     const user = await User.findOne({ email });
//     if (!user) {
//       await recordFailedLogin(email, req);
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       await recordFailedLogin(user.name, req);
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     await recordSuccessLogin(user, req);

//     /* ✅ NEW: Set online status + last active */
//     user.isOnline = true;
//     user.lastActive = new Date();
//     await user.save();

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       SECRET_KEY,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         isOnline: true, // ✅ NEW
//         lastActive: user.lastActive,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// /* ---------------------- SHEETS UPLOAD (UNCHANGED) ---------------------- */

// export const uploadSheets = async (req, res) => {
//   try {
//     const { sheets, meta } = req.body;

//     const publisher = req.body.publisher || meta?.publisher;
//     const advertiser = req.body.advertiser || meta?.advertiser;
//     const campaign = req.body.campaign || meta?.campaign;
//     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

//     if (!sheets?.length)
//       return res.status(400).json({ message: "No sheet data provided" });

//     if (!publisher || !advertiser || !campaign || !uploadedBy)
//       return res.status(400).json({ message: "Missing required metadata fields" });

//     const uploader = await User.findOne({ name: uploadedBy });
//     if (!uploader)
//       return res.status(404).json({ message: `Uploader '${uploadedBy}' not found` });

//     const formattedSheets = sheets.map((sheet) => ({
//       name: sheet.name || sheet.original || "Unknown",
//       data: normalizeRows(sheet.data),
//       publisher,
//       advertiser,
//       campaign,
//       uploadedBy: uploader._id,
//       uploadedByName: uploader.name,
//     }));

//     const savedSheets = await Sheet.insertMany(formattedSheets);

//     res.status(201).json({
//       message: "Sheets uploaded successfully",
//       savedSheets,
//     });
//   } catch (err) {
//     console.error("Error saving sheets:", err);
//     res.status(500).json({
//       message: "Internal Server Error",
//       error: err.message,
//     });
//   }
// };

// /* ---------------------- GENEALOGY UPLOAD (UNCHANGED) ---------------------- */

// export const uploadGenealogySheets = async (req, res) => {
//   try {
//     const { sheets, meta } = req.body;

//     const publisher = req.body.publisher || meta?.publisher;
//     const advertiser = req.body.advertiser || meta?.advertiser;
//     const campaign = req.body.campaign || meta?.campaign;
//     const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

//     if (!sheets?.length)
//       return res.status(400).json({ message: "No genealogy sheet data" });

//     if (!publisher || !advertiser || !campaign || !uploadedBy)
//       return res.status(400).json({ message: "Missing metadata" });

//     const uploader = await User.findOne({ name: uploadedBy });
//     if (!uploader)
//       return res.status(404).json({ message: `Uploader '${uploadedBy}' not found` });

//     const formattedSheets = sheets.map((sheet) => ({
//       name: sheet.name || sheet.original || "Unknown",
//       data: normalizeRows(sheet.data),
//       publisher,
//       advertiser,
//       campaign,
//       uploadedBy: uploader._id,
//       uploadedByName: uploader.name,
//     }));

//     const savedGenealogySheets = await GenealogySheet.insertMany(formattedSheets);

//     res.status(201).json({
//       message: "Genealogy sheets uploaded successfully",
//       savedGenealogySheets,
//     });
//   } catch (err) {
//     console.error("❌ Error saving genealogy sheets:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// /* ---------------------- SHEET LIST FETCH (UPDATED WITH ONLINE STATUS) ---------------------- */

// export const getAllSheets = async (req, res) => {
//   try {
//     const { role, userId } = req.user;

//     /* ✅ NEW: Update user activity */
//     await User.findByIdAndUpdate(userId, {
//       isOnline: true,
//       lastActive: new Date(),
//     });

//     if (role === "admin") {
//       const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
//       return res.status(200).json(allSheets);
//     }

//     if (role === "advertiser") {
//       const advertiserSheets = await Sheet.find({ uploadedBy: userId });
//       return res.status(200).json(advertiserSheets);
//     }

//     if (role === "publisher") {
//       const publisherSheets = await Sheet.find({ publisher: userId });
//       return res.status(200).json(publisherSheets);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ---------------------- GENEALOGY FETCH (UNCHANGED) ---------------------- */

// export const getAllGenealogySheets = async (req, res) => {
//   try {
//     const userId = req.user?.userId || req.user?._id;

//     const userSheets = await GenealogySheet.find({ uploadedBy: userId })
//       .populate("uploadedBy", "name email role");

//     if (!userSheets.length)
//       return res.status(404).json({ message: "No genealogy sheets found" });

//     res.status(200).json(userSheets);
//   } catch (err) {
//     console.error("❌ Error fetching genealogy:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// /* ---------------------- USER CRUD (UNCHANGED) ---------------------- */

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}, "-password");
//     res.status(200).json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const updateUser = async (req, res) => {
//   try {
//     const updated = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     ).select("-password");

//     if (!updated) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "User updated successfully", user: updated });
//   } catch (err) {
//     console.error("Error updating user:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const deleted = await User.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// /* ---------------------- FETCH ALL DATA (UNCHANGED) ---------------------- */

// export const getAlldata = async (req, res) => {
//   try {
//     const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
//     const allGenealogy = await GenealogySheet.find().populate(
//       "uploadedBy",
//       "name email role"
//     );

//     res.status(200).json({
//       message: "Fetched all uploaded data",
//       totalSheets: allSheets.length,
//       totalGenealogy: allGenealogy.length,
//       sheets: allSheets,
//       genealogySheets: allGenealogy,
//     });
//   } catch (err) {
//     console.error("Error fetching all data:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// /* ---------------------- LOGIN HISTORY (UNCHANGED) ---------------------- */

// export const getLoginHistory = async (req, res) => {
//   try {
//     const logs = await LoginActivity.find().sort({ timestamp: -1 }).lean();
//     res.status(200).json({ logs });
//   } catch (err) {
//     console.error("❌ Error fetching login history:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// /* ---------------------- ONLINE USERS (NEW FEATURE) ---------------------- */

// export const getOnlineUsers = async (req, res) => {
//   try {
//     const users = await User.find({}, "name email role isOnline lastActive");

//     res.status(200).json({
//       message: "Online status fetched successfully",
//       users,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching online users:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  User,
  Sheet,
  GenealogySheet,
  LoginActivity,
  FailedAttempt, // ✅ Added new model
} from "../models/SheetModel.js";

const SECRET_KEY = "mySecretKey";

/* ---------------------- HELPERS ---------------------- */

const STRIP_KEYS = new Set([
  "publisher",
  "advertiser",
  "campaign",
  "uploadedBy",
  "uploadedByName",
  "uploadTime",
  "metadata",
  "__sheetOriginalName",
  "__rowIndex",
]);

const stripRowMeta = (row) => {
  if (!row || typeof row !== "object") return {};
  const clean = {};
  for (const k of Object.keys(row)) {
    if (!STRIP_KEYS.has(k)) clean[k] = row[k];
  }
  return clean;
};

const normalizeRows = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map((r) =>
    r && typeof r === "object" && !Array.isArray(r) ? stripRowMeta(r) : r
  );
};

/* ---------------------- LOGIN ACTIVITY HELPERS ---------------------- */

const recordSuccessLogin = async (user, req) => {
  try {
    await LoginActivity.create({
      userId: user._id,
      username: user.name,
      action: "login_success",
      ipAddress: req.ip,
      browser: req.headers["user-agent"],
    });
  } catch (err) {
    console.log("⚠️ Couldn't save login success log:", err.message);
  }
};

const recordFailedLogin = async (username, req) => {
  try {
    await LoginActivity.create({
      username: username || "unknown",
      action: "login_failed",
      ipAddress: req.ip,
      browser: req.headers["user-agent"],
    });
  } catch (err) {
    console.log("⚠️ Couldn't save failed login log:", err.message);
  }
};

/* ---------------------- AUTH ---------------------- */

// ✅ SIGNUP (UNCHANGED)
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    const validRoles = ["admin", "publisher", "advertiser"];
    if (!validRoles.includes(role.toLowerCase()))
      return res.status(400).json({ message: "Invalid role" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: newUser,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ---------------------- LOGIN WITH BLOCK LOGIC ---------------------- */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });

    /* ✅ USER NOT FOUND */
    if (!user) {
      await recordFailedLogin(email, req);
      return res.status(404).json({ message: "User not found" });
    }

    /* ✅ CHECK IF USER ALREADY BLOCKED */
    let attemptDoc = await FailedAttempt.findOne({ username: user.name });

    if (attemptDoc?.blocked) {
      return res.status(403).json({
        message:
          "Account blocked due to multiple failed attempts. Contact admin.",
      });
    }

    /* ✅ CHECK PASSWORD */
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      await recordFailedLogin(user.name, req);

      if (!attemptDoc) {
        attemptDoc = await FailedAttempt.create({
          username: user.name,
          attempts: 1,
          blocked: false,
        });
      } else {
        attemptDoc.attempts += 1;
      }

      if (attemptDoc.attempts >= 3) {
        attemptDoc.blocked = true;
      }

      attemptDoc.lastAttempt = new Date();
      await attemptDoc.save();

      return res.status(401).json({
        message: attemptDoc.blocked
          ? "Account blocked after 3 failed attempts!"
          : "Invalid credentials",
      });
    }

    /* ✅ SUCCESSFUL LOGIN — RESET FAILED ATTEMPTS */
    if (attemptDoc) {
      attemptDoc.attempts = 0;
      attemptDoc.blocked = false;
      await attemptDoc.save();
    }

    /* ✅ RECORD SUCCESS */
    await recordSuccessLogin(user, req);

    /* ✅ UPDATE ONLINE STATUS */
    user.isOnline = true;
    user.lastActive = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isOnline: true,
        lastActive: user.lastActive,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ---------------------- SHEETS UPLOAD (UNCHANGED) ---------------------- */

export const uploadSheets = async (req, res) => {
  try {
    const { sheets, meta } = req.body;

    const publisher = req.body.publisher || meta?.publisher;
    const advertiser = req.body.advertiser || meta?.advertiser;
    const campaign = req.body.campaign || meta?.campaign;
    const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

    if (!sheets?.length)
      return res.status(400).json({ message: "No sheet data provided" });

    if (!publisher || !advertiser || !campaign || !uploadedBy)
      return res.status(400).json({ message: "Missing required metadata fields" });

    const uploader = await User.findOne({ name: uploadedBy });
    if (!uploader)
      return res.status(404).json({ message: `Uploader '${uploadedBy}' not found` });

    const formattedSheets = sheets.map((sheet) => ({
      name: sheet.name || sheet.original || "Unknown",
      data: normalizeRows(sheet.data),
      publisher,
      advertiser,
      campaign,
      uploadedBy: uploader._id,
      uploadedByName: uploader.name,
    }));

    const savedSheets = await Sheet.insertMany(formattedSheets);

    res.status(201).json({
      message: "Sheets uploaded successfully",
      savedSheets,
    });
  } catch (err) {
    console.error("Error saving sheets:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

/* ---------------------- GENEALOGY UPLOAD (UNCHANGED) ---------------------- */

export const uploadGenealogySheets = async (req, res) => {
  try {
    const { sheets, meta } = req.body;

    const publisher = req.body.publisher || meta?.publisher;
    const advertiser = req.body.advertiser || meta?.advertiser;
    const campaign = req.body.campaign || meta?.campaign;
    const uploadedBy = req.body.uploadedBy || meta?.uploadedBy;

    if (!sheets?.length)
      return res.status(400).json({ message: "No genealogy sheet data" });

    if (!publisher || !advertiser || !campaign || !uploadedBy)
      return res.status(400).json({ message: "Missing metadata" });

    const uploader = await User.findOne({ name: uploadedBy });
    if (!uploader)
      return res.status(404).json({ message: `Uploader '${uploadedBy}' not found` });

    const formattedSheets = sheets.map((sheet) => ({
      name: sheet.name || sheet.original || "Unknown",
      data: normalizeRows(sheet.data),
      publisher,
      advertiser,
      campaign,
      uploadedBy: uploader._id,
      uploadedByName: uploader.name,
    }));

    const savedGenealogySheets = await GenealogySheet.insertMany(formattedSheets);

    res.status(201).json({
      message: "Genealogy sheets uploaded successfully",
      savedGenealogySheets,
    });
  } catch (err) {
    console.error("❌ Error saving genealogy sheets:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ---------------------- GET SHEETS (UNCHANGED) ---------------------- */

export const getAllSheets = async (req, res) => {
  try {
    const { role, userId } = req.user;

    await User.findByIdAndUpdate(userId, {
      isOnline: true,
      lastActive: new Date(),
    });

    if (role === "admin") {
      const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
      return res.status(200).json(allSheets);
    }

    if (role === "advertiser") {
      const advertiserSheets = await Sheet.find({ uploadedBy: userId });
      return res.status(200).json(advertiserSheets);
    }

    if (role === "publisher") {
      const publisherSheets = await Sheet.find({ publisher: userId });
      return res.status(200).json(publisherSheets);
    }
  } catch (error) {
    console.log(error);
  }
};

/* ---------------------- GENEALOGY FETCH (UNCHANGED) ---------------------- */

export const getAllGenealogySheets = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;

    const userSheets = await GenealogySheet.find({ uploadedBy: userId })
      .populate("uploadedBy", "name email role");

    if (!userSheets.length)
      return res.status(404).json({ message: "No genealogy sheets found" });

    res.status(200).json(userSheets);
  } catch (err) {
    console.error("❌ Error fetching genealogy:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ---------------------- USER CRUD (UNCHANGED) ---------------------- */

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: updated });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ---------------------- FETCH ALL DATA (UNCHANGED) ---------------------- */

export const getAlldata = async (req, res) => {
  try {
    const allSheets = await Sheet.find().populate("uploadedBy", "name email role");
    const allGenealogy = await GenealogySheet.find().populate(
      "uploadedBy",
      "name email role"
    );

    res.status(200).json({
      message: "Fetched all uploaded data",
      totalSheets: allSheets.length,
      totalGenealogy: allGenealogy.length,
      sheets: allSheets,
      genealogySheets: allGenealogy,
    });
  } catch (err) {
    console.error("Error fetching all data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ---------------------- LOGIN HISTORY (UNCHANGED) ---------------------- */

export const getLoginHistory = async (req, res) => {
  try {
    const logs = await LoginActivity.find().sort({ timestamp: -1 }).lean();
    res.status(200).json({ logs });
  } catch (err) {
    console.error("❌ Error fetching login history:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ---------------------- ONLINE USERS (UNCHANGED) ---------------------- */

export const getOnlineUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role isOnline lastActive");

    res.status(200).json({
      message: "Online status fetched successfully",
      users,
    });
  } catch (error) {
    console.error("❌ Error fetching online users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



/* ---------------------- BLOCKED USERS LIST ---------------------- */

export const getBlockedUsers = async (req, res) => {
  try {
    const blockedUsers = await FailedAttempt.find({ blocked: true }).sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Blocked users fetched successfully",
      blockedUsers,
    });
  } catch (err) {
    console.error("❌ Error fetching blocked users:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// ✅ UNBLOCK USER MANUALLY
export const unblockUser = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    let doc = await FailedAttempt.findOne({ username });

    if (!doc) {
      return res.status(404).json({
        message: "User has no failed attempts record",
      });
    }

    doc.blocked = false;
    doc.attempts = 0;
    await doc.save();

    return res.status(200).json({
      message: `${username} unblocked successfully`,
      blocked: false,
    });
  } catch (error) {
    console.error("❌ Error unblocking user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// ✅ BLOCK USER MANUALLY
export const blockUser = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    let doc = await FailedAttempt.findOne({ username });

    if (!doc) {
      doc = await FailedAttempt.create({
        username,
        attempts: 3,
        blocked: true,
      });
    } else {
      doc.blocked = true;
      doc.attempts = 3;
      await doc.save();
    }

    return res.status(200).json({
      message: `${username} blocked successfully`,
      blocked: true,
    });
  } catch (error) {
    console.error("❌ Error blocking user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
