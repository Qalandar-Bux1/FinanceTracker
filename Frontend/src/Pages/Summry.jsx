import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Summary = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const token = localStorage.getItem("studentToken");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id;

  useEffect(() => {
    if (userId) {
      fetchSummary();
    }
  }, [userId]);

  const fetchSummary = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/transactions/get-all', { userId });
      const transactions = res.data.transactions;

      const totalIncome = transactions
        .filter(tx => tx.transactionType === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);

      const totalExpense = transactions
        .filter(tx => tx.transactionType === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);

      setIncome(totalIncome);
      setExpense(totalExpense);
      setBalance(totalIncome - totalExpense);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-700">Financial Summary</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-green-100 p-4 rounded">
          <p className="text-green-700 font-semibold">Total Income</p>
          <p className="text-2xl font-bold text-green-800">Rs. {income}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <p className="text-red-700 font-semibold">Total Expense</p>
          <p className="text-2xl font-bold text-red-800">Rs. {expense}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <p className="text-blue-700 font-semibold">Current Balance</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-800' : 'text-red-600'}`}>
            Rs. {balance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
