import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#4ade80', '#f87171']; // green, red

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const token = localStorage.getItem('studentToken');
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id;

  useEffect(() => {
    if (userId) {
      fetchTransactionData();
    }
  }, [userId]);

  const fetchTransactionData = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/transactions/get-all', { userId });
      const transactions = res.data.transactions;

      const totalIncome = transactions
        .filter(tx => tx.transactionType === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);

      const totalExpense = transactions
        .filter(tx => tx.transactionType === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);

      const chart = [
        { name: 'Income', value: totalIncome },
        { name: 'Expense', value: totalExpense },
      ];

      setChartData(chart);
    } catch (err) {
      console.error("Error loading chart data:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Income vs Expense</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No transaction data available.</p>
      )}
    </div>
  );
};

export default Chart;
