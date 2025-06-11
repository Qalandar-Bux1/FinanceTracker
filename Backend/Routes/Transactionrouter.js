const express = require("express");
const {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../Controllers/transactionController");

const router = express.Router();


router.post("/add", addTransaction);


router.post("/get-all", getAllTransactions);


router.delete("/delete/:id", deleteTransaction);

router.put("/update/:id", updateTransaction);

module.exports = router;
