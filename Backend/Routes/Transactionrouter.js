const express = require("express");
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../Controllers/transactionController");

const router = express.Router();

// Route to add a new transaction
router.post("/add", addTransaction);

// Route to get all transactions with filters
router.post("/get-all", getAllTransactions);

// Route to delete a transaction
router.delete("/delete/:id", deleteTransaction);

// Route to update a transaction
router.put("/update/:id", updateTransaction);

module.exports = router;
