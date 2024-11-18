import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState('March'); // Default month
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false); // To control the "Next" button

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchTransactions();
        }, 500); // Debounce time

        return () => clearTimeout(delayDebounce);
    }, [month, searchTerm, page]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`/api/transactions?month=${month}&search=${searchTerm}&page=${page}`);
            setTransactions(response.data.transactions);
            setHasNextPage(response.data.hasNextPage); // Set whether there’s a next page
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    return (
        <div className="transaction-table">
            <h2>Transaction Dashboard</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search transaction"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.sold ? 'Yes' : 'No'}</td>
                            <td><img src={transaction.image} alt={transaction.title} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span>Page No: {page}</span>
                <button onClick={() => setPage((prev) => prev + 1)} disabled={!hasNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionTable;
