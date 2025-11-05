

// // import mongoose from "mongoose";

// // // ===== User Signup Schema =====
// // const userSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true, trim: true },
// //     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
// //     password: { type: String, required: true, minlength: 6 },
// //   },
// //   { timestamps: true }
// // );

// // // ===== Sheet Upload Schema =====
// // const sheetSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true, trim: true },
// //     data: { type: [mongoose.Schema.Types.Mixed], required: true },
// //     uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
// //   },
// //   { timestamps: true }
// // );

// // const User = mongoose.models.User || mongoose.model("User", userSchema);
// // const Sheet = mongoose.models.Sheet || mongoose.model("Sheet", sheetSchema);

// // export { User, Sheet };


// import mongoose from "mongoose";

// // ===== 👤 USER SCHEMA =====
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     password: { type: String, required: true, minlength: 6 },
//     role: {
//       type: String,
//       enum: ["admin", "publisher", "advertiser"],
//       default: "advertiser",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// // ===== 📊 SHEET SCHEMA =====
// const sheetSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     data: { type: [mongoose.Schema.Types.Mixed], required: true },
//     uploadedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: {type:String},
//       required: false,
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.models.User || mongoose.model("User", userSchema);
// const Sheet = mongoose.models.Sheet || mongoose.model("Sheet", sheetSchema);

// export { User, Sheet };

import mongoose from "mongoose";

// ===== 👤 USER SCHEMA =====
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["admin", "publisher", "advertiser"],
      default: "advertiser",
      required: true,
    },
  },
  { timestamps: true }
);

// ===== 📊 SHEET SCHEMA =====
const sheetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    data: { type: [mongoose.Schema.Types.Mixed], required: true },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ Correct ref
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Sheet = mongoose.models.Sheet || mongoose.model("Sheet", sheetSchema);

export { User, Sheet };
