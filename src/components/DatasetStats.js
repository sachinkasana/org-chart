import React from 'react';
import expandedOrgData from '../data/expandedOrgData';

const DatasetStats = () => {
  // Calculate statistics from the dataset
  const totalEmployees = expandedOrgData.length;
  
  // Count by employee type
  const employeeTypeCounts = expandedOrgData.reduce((acc, emp) => {
    if (emp.employeeType) {
      acc[emp.employeeType] = (acc[emp.employeeType] || 0) + 1;
    }
    return acc;
  }, {});
  
  // Count by department
  const departmentCounts = expandedOrgData.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});
  
  // Count by location
  const locationCounts = expandedOrgData.reduce((acc, emp) => {
    acc[emp.location] = (acc[emp.location] || 0) + 1;
    return acc;
  }, {});
  
  // Count initiatives and teams
  const initiatives = expandedOrgData.filter(emp => emp.isInitiative).length;
  const teams = expandedOrgData.filter(emp => emp.isTeam).length;
  const individuals = expandedOrgData.filter(emp => !emp.isInitiative && !emp.isTeam).length;
  
  // Matrix organization count (people with different parentId vs reportsTo)
  const matrixEmployees = expandedOrgData.filter(emp => 
    emp.parentId !== emp.reportsTo && emp.parentId && emp.reportsTo
  ).length;

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '24px' }}>
        📊 POC Dataset Statistics
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Overview Stats */}
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <h3 style={{ color: '#495057', marginBottom: '15px', fontSize: '18px' }}>📈 Overview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div><strong>Total Employees:</strong> {totalEmployees}</div>
            <div><strong>Individual Contributors:</strong> {individuals}</div>
            <div><strong>Teams/Segments:</strong> {teams}</div>
            <div><strong>Initiatives/Projects:</strong> {initiatives}</div>
            <div><strong>Matrix Relationships:</strong> {matrixEmployees}</div>
          </div>
        </div>

        {/* Employee Types */}
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <h3 style={{ color: '#495057', marginBottom: '15px', fontSize: '18px' }}>👥 Employee Types</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
            {Object.entries(employeeTypeCounts)
              .sort(([,a], [,b]) => b - a)
              .map(([type, count]) => (
                <div key={type} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{type}:</span>
                  <strong>{count}</strong>
                </div>
              ))}
          </div>
        </div>

        {/* Departments */}
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <h3 style={{ color: '#495057', marginBottom: '15px', fontSize: '18px' }}>🏢 Departments</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
            {Object.entries(departmentCounts)
              .sort(([,a], [,b]) => b - a)
              .map(([dept, count]) => (
                <div key={dept} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{dept}:</span>
                  <strong>{count}</strong>
                </div>
              ))}
          </div>
        </div>

        {/* Locations */}
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
          <h3 style={{ color: '#495057', marginBottom: '15px', fontSize: '18px' }}>📍 Locations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
            {Object.entries(locationCounts)
              .sort(([,a], [,b]) => b - a)
              .map(([location, count]) => (
                <div key={location} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{location}:</span>
                  <strong>{count}</strong>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetStats;
