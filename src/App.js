import React from 'react';
import './App.css';
import OrgChartWithSearch from './components/OrgChartWithSearch';
import DatasetStats from './components/DatasetStats';
import expandedOrgData, { transformDataForOrgChart } from './data/expandedOrgData';

function App() {
  const orgChartData = transformDataForOrgChart(expandedOrgData);

  return (
    <div className="App">
      <header style={{ 
        padding: '2px', 
        backgroundColor: '#2c3e50', 
        color: 'white',
        textAlign: 'center'
      }}>
        <h1>Organization Chart - POC Demo</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <DatasetStats />
        <OrgChartWithSearch data={orgChartData} originalData={expandedOrgData} />
      </main>
    </div>
  );
}

export default App;
