const express =require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} =require("../Controllers/usercontroller.js");
const protect  =require("../Middleware/authmiddleware.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports=router
