import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = () => {
    // Example data for the chart
    const data = [
        { name: '0-100', count: 23 },
        { name: '101-200', count: 45 },
        { name: '201-300', count: 12 },
        { name: '301-400', count: 32 },
        { name: '401-500', count: 15 }
    ];

    return (
        <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
    );
};

export default BarChartComponent;
