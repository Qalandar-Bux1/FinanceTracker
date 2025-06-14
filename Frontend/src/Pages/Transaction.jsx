import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    title: '',
    amount: '',
    description: '',
    date: '',
    category: '',
    transactionType: 'income',
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("studentToken");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id;

  useEffect(() => {
    if (userId) fetchTransactions();
  }, [userId]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/transactions/get-all', { userId });
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/transactions/update/${editingId}`, {
          ...form,
          user: userId,
        });
      } else {
        await axios.post('http://localhost:5000/api/transactions/add', { ...form, userId });
      }
      fetchTransactions();
      setForm({ title: '', amount: '', description: '', date: '', category: '', transactionType: 'income' });
      setEditingId(null);
    } catch (err) {
      console.error('Error saving transaction:', err);
    }
  };

  const handleEdit = (tx) => {
    setForm({
      title: tx.title,
      amount: tx.amount,
      description: tx.description,
      date: tx.date.split("T")[0],
      category: tx.category,
      transactionType: tx.transactionType,
    });
    setEditingId(tx._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/delete/${id}`, {
        data: { userId },
      });
      fetchTransactions();
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-700">Manage Transactions</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
        <input type="text" placeholder="Title" className="border p-2 rounded" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input type="number" placeholder="Amount" className="border p-2 rounded" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        <input type="text" placeholder="Category" className="border p-2 rounded" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input type="date" className="border p-2 rounded" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <select className="border p-2 rounded" value={form.transactionType} onChange={(e) => setForm({ ...form, transactionType: e.target.value })}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <textarea placeholder="Description" className="border p-2 rounded md:col-span-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-full">
          {editingId ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-center">Amount</th>
              <th className="p-3 text-center">Type</th>
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id} className="border-t text-center">
                <td className="p-3 text-left">{tx.title}</td>
                <td className="p-3">{tx.amount}</td>
                <td className="p-3 capitalize">{tx.transactionType}</td>
                <td className="p-3">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="p-3">{tx.category}</td>
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button onClick={() => handleEdit(tx)} className="px-3 py-1 bg-yellow-400 rounded text-white text-sm">Edit</button>
                    <button onClick={() => handleDelete(tx._id)} className="px-3 py-1 bg-red-500 rounded text-white text-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <p className="text-center p-4 text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Transaction;
