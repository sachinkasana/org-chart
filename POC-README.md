# Organization Chart POC - Comprehensive Demo

## Overview
This is a comprehensive Proof of Concept (POC) organizational chart built with React and d3-org-chart, featuring 180+ employees across a realistic technology organization structure.

## Dataset Features

### Scale
- **180+ employees** across all organizational levels
- **Complete organizational hierarchy** from CTO to individual contributors
- **Realistic distribution** of roles and responsibilities
- **Multiple geographic locations** (San Francisco, Seattle, Austin, Boston, Remote)

### Employee Types (All Represented)
The dataset includes all 10+ employee types with different visual color coding:

1. **New Hire** - Recently joined employees
2. **Approved but Not Started** - Hired but not yet started
3. **Architecture** - Technical architects and senior technical roles
4. **RFP Workpackage Placeholder** - Future roles being planned/budgeted
5. **WoodMac FTE** - Full-time employees (core workforce)
6. **Contractor** - Contract and temporary workers
7. **Working Notice** - Employees in transition/leaving
8. **Product Owner Horizontal / Platform** - Platform-focused product owners
9. **Scrum Master** - Agile coaches and scrum masters
10. **Product Owner Segment** - Business segment-focused product owners

### Organizational Structure

#### Executive Level
- **CTO**: Amy Altman (Chief Technology Officer)

#### VP Level (4 VPs)
- **VP Engineering**: Michael Chen - Manages all engineering teams
- **VP Product**: Sarah Johnson - Oversees product management
- **VP Data & Analytics**: David Rodriguez - Leads data science and analytics
- **VP Platform**: Lisa Thompson - Manages infrastructure and platform

#### Engineering Organization
- **Frontend Teams**: React, UI/UX Engineering
- **Backend Teams**: Microservices, Database, API Services
- **Mobile Teams**: iOS and Android development
- **Initiative Teams**: Platform Modernization, API Migration, Security Enhancement

#### Product Organization
- **Consumer Products**: User-facing product development
- **Enterprise Products**: B2B and enterprise solutions
- **Platform Products**: Internal platform and API products

#### Data & Analytics
- **Data Engineering**: ETL, pipelines, infrastructure
- **Analytics**: Business intelligence and reporting
- **Machine Learning**: ML engineering and data science

#### Platform & Infrastructure
- **Cloud Infrastructure**: AWS/Cloud architecture
- **DevOps**: CI/CD, automation, deployment
- **Site Reliability**: SRE, monitoring, performance

### Matrix Organization Features
The dataset demonstrates complex organizational structures including:
- **Dual reporting relationships**: Some employees work on initiatives but report to different managers
- **Cross-functional teams**: Engineers working across departments on shared initiatives
- **Initiative-based work**: Project teams that span multiple organizational units

### Key POC Demonstration Points

1. **Scalability**: Handles 180+ nodes efficiently with good performance
2. **Visual Clarity**: Color-coded employee types make organizational patterns immediately visible
3. **Search Functionality**: Find employees by name, role, department, or location
4. **Export Capabilities**: Generate PNG/SVG exports for documentation and presentations
5. **Matrix Relationships**: Shows both functional (initiative) and reporting (management) hierarchies
6. **Real-world Complexity**: Includes contractors, new hires, departing employees, and placeholder roles
7. **Geographic Distribution**: Multi-location organization with remote workers
8. **Professional Presentation**: Clean, business-ready interface with comprehensive legend

### Usage Instructions

1. **Navigation**: Use mouse to pan and zoom around the large organization
2. **Expand/Collapse**: Click nodes to expand or collapse sections
3. **Search**: Use the search bar to quickly find specific employees or roles
4. **View Controls**: Use "Fit to Screen" and "Expand All" buttons for better navigation
5. **Export**: Generate high-quality images for presentations using PNG/SVG export
6. **Legend**: Reference the color-coded legend to understand employee type classifications

### Technical Implementation
- **React 19.1.0**: Modern React with hooks for state management
- **d3-org-chart 3.0.1**: Professional organizational chart visualization
- **Responsive Design**: Works on different screen sizes
- **Performance Optimized**: Efficient rendering of large datasets
- **TypeScript Compatible**: Clean, maintainable codebase

This POC demonstrates the library's capability to handle enterprise-scale organizational data while maintaining visual clarity and professional presentation standards.
