import React, { useRef, useEffect } from 'react';
import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';
import { getEmployeeTypeColors } from '../data/expandedOrgData';

const OrgChartComponent = ({ data }) => {
  const d3Container = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      console.log('Rendering chart with data:', data);
      
      if (!chart.current) {
        chart.current = new OrgChart();
      }

      // Clear the container first
      d3Container.current.innerHTML = '';

      // Convert hierarchical data back to flat format for d3-org-chart
      const flattenData = (node, result = []) => {
        result.push({
          id: node.id,
          parentId: node.parentId,
          originalParentId: node.parentId, // Keep original for reference
          reportsTo: node.reportsTo,
          name: node.name,
          positionName: node.positionName,
          department: node.department,
          location: node.location,
          email: node.email,
          phone: node.phone,
          isInitiative: node.isInitiative,
          isTeam: node.isTeam,
          employeeType: node.employeeType
        });
        
        if (node.children && node.children.length > 0) {
          node.children.forEach(child => flattenData(child, result));
        }
        
        return result;
      };

      const flatData = flattenData(data);
      console.log('Flattened data for d3-org-chart:', flatData);

      chart.current
        .container(d3Container.current)
        .data(flatData)
        .nodeId(d => d.id)
        .parentNodeId(d => d.parentId)
        .nodeWidth(() => 320)
        .nodeHeight(() => 180)
        .childrenMargin(() => 70)
        .compactMarginBetween(() => 25)
        .compactMarginPair(() => 30)
        .siblingsMargin(() => 40)
        .compact(true)
        .buttonContent(() => {
          return '<div style="color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">⬇</span> </div>';
        })
        .onNodeClick((d) => {
          console.log('Node clicked:', d);
          
          // Center and zoom to the clicked node
          if (chart.current) {
            // First center the node
            chart.current.setCentered(d.data.id);
            
            // Then apply a zoom to focus on this area
            setTimeout(() => {
              try {
                const svg = d3Container.current.querySelector('svg');
                if (svg) {
                  const currentTransform = d3.zoomTransform(svg);
                  const newScale = Math.max(currentTransform.k * 1.8, 2.0); // Zoom in by 1.8x or minimum 2.0x
                  const selection = d3.select(svg);
                  const zoom = d3.zoom();
                  selection.call(zoom.scaleTo, newScale);
                }
              } catch (error) {
                console.log('Zoom on click not available, using alternative');
                // Fallback: just center the node
                chart.current.setCentered(d.data.id);
              }
            }, 100);
          }
        })
        .nodeContent((d) => {
          const nodeData = d.data;
          
          // Different styling for different node types
          let backgroundColor = '#fff';
          let borderColor = '#3498db';
          let avatarBg = '#3498db';
          let textColor = '#333';
          
          if (nodeData.isInitiative) {
            backgroundColor = '#f8f9fa';
            borderColor = '#28a745';
            avatarBg = '#28a745';
          } else if (nodeData.isTeam) {
            backgroundColor = '#fff3cd';
            borderColor = '#ffc107';
            avatarBg = '#ffc107';
          } else if (nodeData.employeeType) {
            // Use fixed colors for different employee types
            const colors = getEmployeeTypeColors(nodeData.employeeType);
            backgroundColor = colors.bg;
            borderColor = colors.border;
            avatarBg = colors.border;
            textColor = colors.text;
          }
          
          // Add visual indicator for matrix relationships (currently unused)
          let matrixIndicator = '';
          
          // Add employee type indicator
          let typeIndicator = '';
          if (nodeData.employeeType && !nodeData.isInitiative && !nodeData.isTeam) {
            typeIndicator = `<div style="position: absolute; top: 2px; left: 2px; background: ${avatarBg}; color: ${textColor}; border-radius: 3px; padding: 3px 6px; font-size: 11px; font-weight: bold;">${nodeData.employeeType}</div>`;
          }
          
          return `
            <div style="
              position: relative;
              width: ${d.width}px;
              height: ${d.height}px;
              padding: 20px;
              background-color: ${backgroundColor};
              border: 2px solid ${borderColor};
              border-radius: 10px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-family: 'Arial', sans-serif;
              color: ${textColor};
              overflow: hidden;
              cursor: pointer;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            ">
              ${matrixIndicator}
              ${typeIndicator}
              <div style="
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: ${avatarBg};
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${textColor === '#333' ? 'white' : textColor};
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
                flex-shrink: 0;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
              ">
                ${nodeData.isInitiative ? '📋' : nodeData.isTeam ? '👥' : nodeData.name.charAt(0).toUpperCase()}
              </div>
              <div style="
                font-weight: bold; 
                font-size: 16px; 
                margin-bottom: 6px; 
                text-align: center;
                line-height: 1.2;
                max-height: 38px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              ">
                ${nodeData.name}
              </div>
              <div style="
                font-size: 14px; 
                color: ${textColor === '#fff' ? '#ddd' : '#666'}; 
                text-align: center;
                line-height: 1.2;
                max-height: 32px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                margin-bottom: 4px;
              ">
                ${nodeData.positionName}
              </div>
              <div style="
                font-size: 12px; 
                color: ${textColor === '#fff' ? '#ccc' : '#888'}; 
                text-align: center;
                max-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 500;
              ">
                ${nodeData.location || nodeData.department || ''}
              </div>
            </div>
          `;
        })
        .render();
      
      // Ensure SVG has proper dimensions for scrolling after render
      setTimeout(() => {
        const svg = d3Container.current.querySelector('svg');
        if (svg) {
          svg.style.minWidth = '100%';
          svg.style.minHeight = '100%';
          svg.style.overflow = 'visible';
        }
      }, 50);
      
      // Expand all nodes after rendering with better initial zoom
      setTimeout(() => {
        if (chart.current) {
          console.log('Attempting to expand all nodes...');
          chart.current.expandAll();
          
          // Try again after a short delay and fit to screen with zoom
          setTimeout(() => {
            chart.current.expandAll();
            setTimeout(() => {
              chart.current.fit();
              // Apply initial zoom for better readability
              setTimeout(() => {
                try {
                  const svg = d3Container.current.querySelector('svg');
                  if (svg) {
                    const selection = d3.select(svg);
                    const zoom = d3.zoom();
                    selection.call(zoom.scaleTo, 1.8); // Start with 1.8x zoom for better text visibility
                  }
                } catch (error) {
                  console.log('Initial zoom not available');
                }
              }, 200);
            }, 100);
          }, 200);
        }
      }, 100);
        }
      }, [data]); // Remove viewMode from dependency array
  const fitToScreen = () => {
    if (chart.current) {
      chart.current.fit();
    }
  };

  // Method to expand all nodes
  const expandAll = () => {
    if (chart.current) {
      console.log('Manual expand all clicked');
      chart.current.expandAll();
      // Try multiple times to ensure it works
      setTimeout(() => chart.current.expandAll(), 100);
      setTimeout(() => chart.current.expandAll(), 300);
      setTimeout(() => chart.current.fit(), 500);
    }
  };

  // Method to collapse all nodes
  const collapseAll = () => {
    if (chart.current) {
      chart.current.collapseAll();
    }
  };

  // Export chart as PNG
  const exportAsPNG = () => {
    if (chart.current) {
      chart.current.exportImg({
        save: true,
        filename: `org-chart-${new Date().toISOString().split('T')[0]}.png`,
        full: true
      });
    }
  };

  // Export chart as SVG
  const exportAsSVG = () => {
    if (chart.current) {
      chart.current.exportSvg({
        save: true,
        filename: `org-chart-${new Date().toISOString().split('T')[0]}.svg`,
        full: true
      });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {/* Color Legend/Indicator Panel */}
      <div style={{ 
        width: '250px', 
        minHeight: '600px', 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #ddd', 
        borderRadius: '5px', 
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          margin: '0 0 15px 0', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          color: '#333',
          borderBottom: '2px solid #ddd',
          paddingBottom: '10px'
        }}>
          Employee Types
        </h3>
        
        {/* Color indicators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F4C2C2',
            border: '2px solid #D4A5A5',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#333', fontSize: '12px', fontWeight: 'bold' }}>New Hire</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#81C784',
            border: '2px solid #66BB6A',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>Approved but Not Started</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#00FF00',
            border: '2px solid #00DD00',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#333', fontSize: '12px', fontWeight: 'bold' }}>Architecture</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#BA68C8',
            border: '2px solid #AB47BC',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>RFP Workpackage Placeholder</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#5DADE2',
            border: '2px solid #3498DB',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>Matrix FTE</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFEB3B',
            border: '2px solid #FBC02D',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#333', fontSize: '12px', fontWeight: 'bold' }}>Contractor</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F44336',
            border: '2px solid #D32F2F',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>Working Notice</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#B39DDB',
            border: '2px solid #9575CD',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#333', fontSize: '12px', fontWeight: 'bold' }}>Product Owner Horizontal / Platform</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#42A5F5',
            border: '2px solid #2196F3',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>Scrum Master</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#8E24AA',
            border: '2px solid #7B1FA2',
            borderRadius: '4px',
            padding: '8px 10px',
            minHeight: '40px'
          }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>Product Owner Segment</span>
          </div>
        </div>
        
        {/* Additional indicators for Teams and Initiatives */}
        <h4 style={{ 
          margin: '20px 0 10px 0', 
          fontSize: '14px', 
          fontWeight: 'bold', 
          color: '#333',
          borderBottom: '1px solid #ddd',
          paddingBottom: '5px'
        }}>
          Other Types
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            border: '2px solid #28a745',
            borderRadius: '4px',
            padding: '6px 8px',
            minHeight: '35px'
          }}>
            <span style={{ color: '#333', fontSize: '11px', fontWeight: 'bold' }}>📋 Initiative</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '4px',
            padding: '6px 8px',
            minHeight: '35px'
          }}>
            <span style={{ color: '#333', fontSize: '11px', fontWeight: 'bold' }}>👥 Team/Segment</span>
          </div>
        </div>
      </div>

      {/* Main Chart Area */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <div style={{ marginBottom: '8px', fontSize: '14px', color: '#495057' }}>
            <strong>💡 Navigation Tips:</strong> Use <strong>mouse wheel to zoom</strong> in/out for better readability. <strong>Click any node</strong> to center and zoom to that area. <strong>Click and drag</strong> to pan around the organization. <strong>Scroll bars</strong> allow navigation of the large dataset in all directions.
          </div>
          <div style={{ marginBottom: '10px' }}>
            {/* View mode toggle removed - no longer needed */}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button 
                onClick={fitToScreen}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                title="Fit entire organization to screen"
              >
                🔍 Fit to Screen
              </button>
              <button 
                onClick={expandAll}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                title="Expand all collapsed sections"
              >
                � Expand All
              </button>
              <button 
                onClick={collapseAll}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                title="Collapse all sections for overview"
              >
                📁 Collapse All
              </button>
            </div>
            
            <div style={{ borderLeft: '1px solid #ddd', paddingLeft: '10px', display: 'flex', gap: '5px' }}>
              <span style={{ fontSize: '14px', color: '#666', alignSelf: 'center', marginRight: '5px' }}>Export:</span>
              <button 
                onClick={exportAsPNG}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
                title="Export chart as PNG image"
              >
                📷 PNG
              </button>
              <button 
                onClick={exportAsSVG}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#fd7e14',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
                title="Export chart as SVG image"
              >
                🎨 SVG
              </button>
            </div>
          </div>
        </div>
        <div 
          ref={d3Container} 
          style={{ 
            width: '100%', 
            height: '90vh',
            minHeight: '800px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            overflow: 'auto',
            backgroundColor: '#fafafa',
            cursor: 'grab',
            position: 'relative'
          }} 
        />
      </div>
    </div>
  );
};

export default OrgChartComponent;
