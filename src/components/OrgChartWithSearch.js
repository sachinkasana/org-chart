import React, { useState } from 'react';
import OrgChartComponent from '../components/OrgChart';

const OrgChartWithSearch = ({ data, originalData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setFilteredData(data);
      return;
    }

    // Filter the original flat data
    const filtered = originalData.filter(person => 
      person.name.toLowerCase().includes(term) ||
      person.positionName.toLowerCase().includes(term) ||
      person.department.toLowerCase().includes(term) ||
      (person.location && person.location.toLowerCase().includes(term))
    );

    // Get all parent IDs for filtered results to maintain hierarchy
    const getAllParents = (personId, allData) => {
      const parents = [];
      let currentPerson = allData.find(p => p.id === personId);
      
      while (currentPerson && currentPerson.parentId) {
        const parent = allData.find(p => p.id === currentPerson.parentId);
        if (parent) {
          parents.push(parent);
          currentPerson = parent;
        } else {
          break;
        }
      }
      return parents;
    };

    // Include all parents of filtered results
    const extendedFiltered = new Set();
    filtered.forEach(person => {
      extendedFiltered.add(person);
      const parents = getAllParents(person.id, originalData);
      parents.forEach(parent => extendedFiltered.add(parent));
    });

    // Transform to hierarchical structure
    const transformToHierarchy = (flatData) => {
      const idMap = {};
      
      // Create a map of all items by id with empty children arrays
      flatData.forEach(item => {
        idMap[item.id] = { 
          ...item, 
          children: [],
          id: item.id,
          parentId: item.parentId
        };
      });
      
      // Build the tree structure
      let root = null;
      flatData.forEach(item => {
        if (item.parentId === null || item.parentId === undefined) {
          // This is the root node
          root = idMap[item.id];
        } else {
          // Add this item to its parent's children array
          if (idMap[item.parentId]) {
            idMap[item.parentId].children.push(idMap[item.id]);
          }
        }
      });
      
      // Return the root object directly, not wrapped in an array
      return root;
    };

    const hierarchicalFiltered = transformToHierarchy(Array.from(extendedFiltered));
    setFilteredData(hierarchicalFiltered);
  };

  return (
    <div>
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: 'white', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <input
          type="text"
          placeholder="Search by name, position, department, or location..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #e1e8ed',
            borderRadius: '25px',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3498db'}
          onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
        />
        {searchTerm && (
          <p style={{ 
            marginTop: '10px', 
            color: '#666', 
            fontSize: '14px' 
          }}>
            {filteredData ? 
              `Found results for "${searchTerm}"` : 
              `No results found for "${searchTerm}"`
            }
          </p>
        )}
      </div>
      <OrgChartComponent data={filteredData} />
    </div>
  );
};

export default OrgChartWithSearch;
