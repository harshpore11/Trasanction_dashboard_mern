const express = require('express');
const { initializeDatabase, getTransactions, getStatistics } = require('../controllers/transactionController');
const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);

module.exports = router;
