import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TransactionsTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

function App() {
  const [month, setMonth] = useState('March');
  const [totalSales, setTotalSales] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);

  // Fetch statistics when month changes
  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
        const response = await axios.get(`/api/statistics?month=${month}`);
        setTotalSales(response.data.totalSales);
        setTotalSoldItems(response.data.totalSoldItems);
        setTotalNotSoldItems(response.data.totalNotSoldItems);
    } catch (error) {
        console.error("Error fetching statistics:", error);
    }
};


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Transaction Dashboard</h1>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <Statistics 
          totalSales={totalSales} 
          totalSoldItems={totalSoldItems} 
          totalNotSoldItems={totalNotSoldItems} 
        />
        <TransactionsTable month={month} />
        <BarChart month={month} />
        <PieChart month={month} />
      </header>
    </div>
  );
}

export default App;