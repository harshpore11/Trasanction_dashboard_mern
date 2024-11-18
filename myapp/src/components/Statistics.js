import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionStatistics = ({ month }) => {
    const [stats, setStats] = useState({ totalSales: 0, soldItems: 0, unsoldItems: 0 });

    useEffect(() => {
        fetchStatistics();
    }, [month]);

    const fetchStatistics = async () => {
        try {
            const response = await axios.get(`/api/statistics?month=${month}`);
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };

    

    return (
        <div className="transaction-statistics">
            <h3>Statistics - {month}</h3>
            <div>
                <p>Total Sale: {stats.totalSales}</p>
                <p>Total Sold Items: {stats.soldItems}</p>
                <p>Total Not Sold Items: {stats.unsoldItems}</p>
            </div>
        </div>
    );
};

export default TransactionStatistics;
