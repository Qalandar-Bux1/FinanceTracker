const mongoose = require("mongoose");

const Transaction = require("../Models/transactionmodel");
const User = require("../Models/usermodel");


// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { title, amount, description, date, category, userId, transactionType } = req.body;

    if (!title || !amount || !description || !date || !category || !transactionType || !userId) {
      return res.status(400).json({ success: false, message: "All fields including userId are required." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const transaction = await Transaction.create({
      title,
      amount,
      description,
      date,
      category,
      transactionType,
      user: userId,
    });

    user.transactions.push(transaction._id);
    await user.save();

    res.status(201).json({ success: true, message: "Transaction added successfully" });
  } catch (error) {
    console.error("🚨 Server error in addTransaction:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get All Transactions (filtered)
const getAllTransactions = async (req, res) => {
  try {
    const { userId, type } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const query = { user: new mongoose.Types.ObjectId(userId) };
    if (type && type !== "all") query.transactionType = type;

    const transactions = await Transaction.find(query).sort({ date: -1 });

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("🔥 Error in getAllTransactions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });


    //user refrence change 
    user.transactions = user.transactions.filter(
      (id) => id.toString() !== transactionId
    );
    await user.save();

    res.status(200).json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const updates = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });

    Object.assign(transaction, updates);
    await transaction.save();

    res.status(200).json({ success: true, message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 

 const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
  getProfile,
};
