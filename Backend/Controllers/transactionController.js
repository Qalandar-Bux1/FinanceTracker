const Transaction = require("../Models/transactionmodel");
const User = require("../models/UserSchema");
const moment = require("moment");

// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { title, amount, description, date, category, userId, transactionType } = req.body;

    if (!title || !amount || !description || !date || !category || !transactionType) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Transactions (filtered)
const getAllTransactions = async (req, res) => {
  try {
    const { userId, type, frequency, startDate, endDate } = req.body;

    const query = { user: userId };
    if (type !== "all") query.transactionType = type;

    const transactions = await Transaction.find(query).sort({ date: -1 });

    res.status(200).json({ success: true, transactions });
  } catch (error) {
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

module.exports = {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
};
