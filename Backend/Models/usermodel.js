const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  
});
const Usermodel = mongoose.model("User", userSchema);

module.exports = Usermodel;
