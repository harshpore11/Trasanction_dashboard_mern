// src/components/PieChartComponent.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
    // Example data for the chart
    const data = {
        labels: ['0-100', '101-200', '201-300', '301-400', '401-500'],
        datasets: [
            {
                label: 'Number of Items by Price Range',
                data: [23, 45, 12, 32, 15],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ],
            },
        ],
    };

    return (
        <div style={{ width: '50%', margin: 'auto' }}>
            <h2>Pie Chart of Items by Price Range</h2>
            <Pie data={data} options={{ responsive: true }} />
        </div>
    );
};

export default PieChartComponent;
