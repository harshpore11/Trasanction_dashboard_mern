const axios = require('axios');
const Transaction = require('../models/Transaction');

// Initialize database with data from third-party API
exports.initializeDatabase = async (req, res) => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.insertMany(data);
        res.json({ message: 'Database initialized with seed data' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

// Get transactions with pagination and search
exports.getTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '' } = req.query;
    const query = search
        ? { $or: [{ title: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }] }
        : {};

    const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));
    res.json(transactions);
};

// Get statistics
exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(Date.parse(`${month} 1, 2020`)).getMonth();

    const totalSales = await Transaction.aggregate([
        { $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber + 1] } } },
        { $group: { _id: null, totalAmount: { $sum: '$price' }, soldCount: { $sum: { $cond: ['$sold', 1, 0] } } } },
    ]);

    const notSoldCount = await Transaction.countDocuments({ sold: false, dateOfSale: { $month: monthNumber + 1 } });
    res.json({ totalSales: totalSales[0].totalAmount, soldItems: totalSales[0].soldCount, notSoldItems: notSoldCount });
};
