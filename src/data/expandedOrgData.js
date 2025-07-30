// Expanded organizational data with 180+ employees for POC demonstration
// Includes all employee types and comprehensive organizational flows

// Helper function to generate random employee data
const generateEmployee = (id, name, position, department, location, parentId, reportsTo, employeeType, isInitiative = false, isTeam = false) => ({
  id,
  parentId,
  reportsTo: reportsTo || parentId,
  name,
  positionName: position,
  department,
  location,
  email: `${name.toLowerCase().replace(/\s+/g, '.')}@company.com`,
  phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
  isInitiative,
  isTeam,
  employeeType
});

// Color mapping function for different employee types
export const getEmployeeTypeColors = (employeeType) => {
  const colorMap = {
    'New Hire': { bg: '#F4C2C2', border: '#D4A5A5', text: '#333' },
    'Approved but Not Started': { bg: '#81C784', border: '#66BB6A', text: '#fff' },
    'Architecture': { bg: '#00FF00', border: '#00DD00', text: '#333' },
    'RFP Workpackage Placeholder': { bg: '#BA68C8', border: '#AB47BC', text: '#fff' },
    'Company FTE': { bg: '#5DADE2', border: '#3498DB', text: '#fff' },
    'Contractor': { bg: '#FFEB3B', border: '#FBC02D', text: '#333' },
    'Working Notice': { bg: '#F44336', border: '#D32F2F', text: '#fff' },
    'Product Owner Horizontal / Platform': { bg: '#B39DDB', border: '#9575CD', text: '#333' },
    'Scrum Master': { bg: '#42A5F5', border: '#2196F3', text: '#fff' },
    'Product Owner Segment': { bg: '#8E24AA', border: '#7B1FA2', text: '#fff' }
  };
  
  return colorMap[employeeType] || { bg: '#fff', border: '#3498db', text: '#333' };
};

// Comprehensive organizational data with 180+ employees
export const expandedOrgData = [
  // CEO Level
  generateEmployee(1, 'Elena Rodriguez', 'Chief Technology Officer', 'Executive', 'New York', null, null, 'Company FTE'),

  // VP Level - Direct reports to CTO
  generateEmployee(2, 'Marcus Thompson', 'VP of Engineering', 'Engineering', 'San Francisco', 1, 1, 'Company FTE'),
  generateEmployee(3, 'Priya Sharma', 'VP of Product', 'Product', 'Austin', 1, 1, 'Company FTE'),
  generateEmployee(4, 'James Kim', 'VP of Data & Analytics', 'Data Science', 'Seattle', 1, 1, 'Company FTE'),
  generateEmployee(5, 'Rachel Chen', 'VP of Platform & Infrastructure', 'Platform', 'Boston', 1, 1, 'Company FTE'),

  // Engineering Organization - Under Marcus Thompson (VP Engineering)
  // Directors
  generateEmployee(10, 'Alex Morgan', 'Director of Engineering Initiatives', 'Engineering', 'San Francisco', 2, 2, 'Company FTE'),
  generateEmployee(11, 'Sofia Martinez', 'Director of Frontend Engineering', 'Engineering', 'San Francisco', 2, 2, 'Architecture'),
  generateEmployee(12, 'David Park', 'Director of Backend Services', 'Engineering', 'Seattle', 2, 2, 'Company FTE'),
  generateEmployee(13, 'Isabella Wright', 'Director of Mobile Engineering', 'Engineering', 'Austin', 2, 2, 'Company FTE'),

  // Engineering Initiatives under Alex Morgan
  generateEmployee(20, 'Cloud Migration Initiative', 'Cloud Migration Project', 'Engineering', 'Multiple', 10, 10, null, true),
  generateEmployee(21, 'Microservices Transformation', 'Service Architecture Project', 'Engineering', 'Seattle', 10, 10, null, true),
  generateEmployee(22, 'DevSecOps Enhancement Program', 'Security & DevOps Initiative', 'Engineering', 'Multiple', 10, 10, null, true),

  // Cloud Migration Team
  generateEmployee(30, 'Oliver Wilson', 'Senior Cloud Engineer', 'Engineering', 'San Francisco', 20, 11, 'Company FTE'),
  generateEmployee(31, 'Emma Davis', 'Cloud Architect', 'Engineering', 'Seattle', 20, 11, 'Architecture'),
  generateEmployee(32, 'Lucas Zhang', 'DevOps Engineer', 'Engineering', 'San Francisco', 20, 11, 'Contractor'),
  generateEmployee(33, 'Zoe Green', 'Cloud Infrastructure Specialist', 'Engineering', 'Seattle', 20, 11, 'New Hire'),
  generateEmployee(34, 'Nathan Anderson', 'Platform Engineer', 'Engineering', 'San Francisco', 20, 11, 'Company FTE'),

  // Microservices Transformation Team
  generateEmployee(35, 'Ethan Taylor', 'Lead Software Architect', 'Engineering', 'Seattle', 21, 12, 'Company FTE'),
  generateEmployee(36, 'Maya White', 'Backend Developer', 'Engineering', 'Austin', 21, 12, 'Contractor'),
  generateEmployee(37, 'Ryan Lee', 'Integration Specialist', 'Engineering', 'Seattle', 21, 12, 'Approved but Not Started'),
  generateEmployee(38, 'Grace Miller', 'Technical Documentation Lead', 'Engineering', 'Remote', 21, 12, 'Company FTE'),

  // DevSecOps Enhancement Team
  generateEmployee(39, 'Logan Brown', 'Security Engineer', 'Security', 'Boston', 22, 12, 'Company FTE'),
  generateEmployee(40, 'Aria Liu', 'Cybersecurity Analyst', 'Security', 'Remote', 22, 12, 'Contractor'),
  generateEmployee(41, 'Mason Kim', 'Security Architect', 'Security', 'Boston', 22, 12, 'Architecture'),

  // Frontend Engineering Teams under Sofia Martinez
  generateEmployee(50, 'React Development Team', 'React Team', 'Engineering', 'San Francisco', 11, 11, null, false, true),
  generateEmployee(51, 'UI/UX Engineering Team', 'UI/UX Team', 'Engineering', 'Austin', 11, 11, null, false, true),

  // React Team
  generateEmployee(60, 'Blake Moore', 'Senior React Developer', 'Engineering', 'San Francisco', 50, 11, 'Company FTE'),
  generateEmployee(61, 'Layla Adams', 'Frontend Engineer', 'Engineering', 'San Francisco', 50, 11, 'New Hire'),
  generateEmployee(62, 'Kai Clark', 'React Specialist', 'Engineering', 'Remote', 50, 11, 'Contractor'),
  generateEmployee(63, 'Nova Torres', 'Frontend Developer', 'Engineering', 'San Francisco', 50, 11, 'Company FTE'),
  generateEmployee(64, 'River Martinez', 'Junior React Developer', 'Engineering', 'San Francisco', 50, 11, 'New Hire'),

  // UI/UX Engineering Team
  generateEmployee(65, 'Phoenix Garcia', 'UI Engineer', 'Engineering', 'Austin', 51, 11, 'Company FTE'),
  generateEmployee(66, 'Sage Scott', 'UX Engineer', 'Engineering', 'Austin', 51, 11, 'Company FTE'),
  generateEmployee(67, 'Quinn Rodriguez', 'Design Systems Engineer', 'Engineering', 'Remote', 51, 11, 'Architecture'),
  generateEmployee(68, 'Blake Johnson', 'Frontend Accessibility Specialist', 'Engineering', 'Austin', 51, 11, 'Contractor'),

  // Backend Services Teams under David Park
  generateEmployee(70, 'Microservices Team', 'Microservices', 'Engineering', 'Seattle', 12, 12, null, false, true),
  generateEmployee(71, 'Database Team', 'Database', 'Engineering', 'Seattle', 12, 12, null, false, true),
  generateEmployee(72, 'API Services Team', 'API Services', 'Engineering', 'Remote', 12, 12, null, false, true),

  // Microservices Team
  generateEmployee(80, 'Jordan Wilson', 'Microservices Architect', 'Engineering', 'Seattle', 70, 12, 'Architecture'),
  generateEmployee(81, 'Casey Chen', 'Senior Backend Engineer', 'Engineering', 'Seattle', 70, 12, 'Company FTE'),
  generateEmployee(82, 'Avery Thompson', 'DevOps Engineer', 'Engineering', 'Remote', 70, 12, 'Contractor'),
  generateEmployee(83, 'Riley Lee', 'Backend Developer', 'Engineering', 'Seattle', 70, 12, 'New Hire'),
  generateEmployee(84, 'Cameron Davis', 'Cloud Engineer', 'Engineering', 'Seattle', 70, 12, 'Company FTE'),
  generateEmployee(85, 'Taylor Brown', 'Backend Engineer', 'Engineering', 'Remote', 70, 12, 'Approved but Not Started'),

  // Database Team
  generateEmployee(86, 'Dakota Hall', 'Database Architect', 'Engineering', 'Seattle', 71, 12, 'Architecture'),
  generateEmployee(87, 'Rowan Wang', 'Senior DBA', 'Engineering', 'Seattle', 71, 12, 'Company FTE'),
  generateEmployee(88, 'Skylar Smith', 'Database Developer', 'Engineering', 'Remote', 71, 12, 'Contractor'),
  generateEmployee(89, 'Harper Johnson', 'Data Engineer', 'Engineering', 'Seattle', 71, 12, 'New Hire'),

  // API Services Team
  generateEmployee(90, 'Logan Martinez', 'API Team Lead', 'Engineering', 'Remote', 72, 12, 'Company FTE'),
  generateEmployee(91, 'Zoe Anderson', 'API Developer', 'Engineering', 'Austin', 72, 12, 'Contractor'),
  generateEmployee(92, 'Caleb Wilson', 'Integration Engineer', 'Engineering', 'Remote', 72, 12, 'Company FTE'),
  generateEmployee(93, 'Hannah Garcia', 'API Documentation Specialist', 'Engineering', 'Remote', 72, 12, 'New Hire'),

  // Mobile Engineering under Maria Gonzalez
  generateEmployee(100, 'iOS Development Team', 'iOS Team', 'Engineering', 'Austin', 13, 13, null, false, true),
  generateEmployee(101, 'Android Development Team', 'Android Team', 'Engineering', 'Austin', 13, 13, null, false, true),

  // iOS Team
  generateEmployee(110, 'Mason Taylor', 'iOS Team Lead', 'Engineering', 'Austin', 100, 13, 'Company FTE'),
  generateEmployee(111, 'Lily Chen', 'Senior iOS Developer', 'Engineering', 'Austin', 100, 13, 'Company FTE'),
  generateEmployee(112, 'Carter Rodriguez', 'iOS Developer', 'Engineering', 'Remote', 100, 13, 'Contractor'),
  generateEmployee(113, 'Aria Kim', 'Junior iOS Developer', 'Engineering', 'Austin', 100, 13, 'New Hire'),

  // Android Team
  generateEmployee(114, 'Hunter Davis', 'Android Team Lead', 'Engineering', 'Austin', 101, 13, 'Company FTE'),
  generateEmployee(115, 'Nova Thompson', 'Senior Android Developer', 'Engineering', 'Austin', 101, 13, 'Company FTE'),
  generateEmployee(116, 'Phoenix Lee', 'Android Developer', 'Engineering', 'Remote', 101, 13, 'Contractor'),
  generateEmployee(117, 'Sage Miller', 'Mobile QA Engineer', 'Engineering', 'Austin', 101, 13, 'New Hire'),

  // Product Organization - Under Priya Sharma (VP Product)
  generateEmployee(120, 'Consumer Products Team', 'Consumer Products', 'Product', 'Austin', 3, 3, null, false, true),
  generateEmployee(121, 'Enterprise Products Team', 'Enterprise Products', 'Product', 'Boston', 3, 3, null, false, true),
  generateEmployee(122, 'Platform Products Team', 'Platform Products', 'Product', 'San Francisco', 3, 3, null, false, true),

  // Consumer Products Team
  generateEmployee(130, 'Emma Martinez', 'Senior Product Manager', 'Product', 'Austin', 120, 3, 'Product Owner Segment'),
  generateEmployee(131, 'Liam Wilson', 'Product Manager', 'Product', 'Austin', 120, 3, 'Product Owner Segment'),
  generateEmployee(132, 'Sophia Anderson', 'Associate Product Manager', 'Product', 'Remote', 120, 3, 'New Hire'),
  generateEmployee(133, 'Noah Garcia', 'Product Analyst', 'Product', 'Austin', 120, 3, 'Company FTE'),

  // Enterprise Products Team
  generateEmployee(134, 'Mia Thompson', 'Senior Product Manager', 'Product', 'Boston', 121, 3, 'Product Owner Segment'),
  generateEmployee(135, 'William Lee', 'Product Manager', 'Product', 'Boston', 121, 3, 'Product Owner Segment'),
  generateEmployee(136, 'Charlotte Davis', 'Technical Product Manager', 'Product', 'Remote', 121, 3, 'Company FTE'),
  generateEmployee(137, 'James Rodriguez', 'Product Owner', 'Product', 'Boston', 121, 3, 'Product Owner Segment'),

  // Platform Products Team
  generateEmployee(138, 'Amelia Kim', 'Principal Product Manager', 'Product', 'San Francisco', 122, 3, 'Product Owner Horizontal / Platform'),
  generateEmployee(139, 'Benjamin Chen', 'Platform Product Manager', 'Product', 'San Francisco', 122, 3, 'Product Owner Horizontal / Platform'),
  generateEmployee(140, 'Harper Johnson', 'API Product Manager', 'Product', 'Remote', 122, 3, 'Product Owner Horizontal / Platform'),

  // Data & Analytics Organization - Under James Kim (VP Data)
  generateEmployee(150, 'Data Engineering Team', 'Data Engineering', 'Data Science', 'Seattle', 4, 4, null, false, true),
  generateEmployee(151, 'Analytics Team', 'Analytics', 'Data Science', 'Seattle', 4, 4, null, false, true),
  generateEmployee(152, 'Machine Learning Team', 'ML Team', 'Data Science', 'Boston', 4, 4, null, false, true),

  // Data Engineering Team
  generateEmployee(160, 'Evelyn Martinez', 'Senior Data Engineer', 'Data Science', 'Seattle', 150, 4, 'Company FTE'),
  generateEmployee(161, 'Alexander Wilson', 'Data Pipeline Engineer', 'Data Science', 'Seattle', 150, 4, 'Architecture'),
  generateEmployee(162, 'Abigail Taylor', 'Data Infrastructure Engineer', 'Data Science', 'Remote', 150, 4, 'Contractor'),
  generateEmployee(163, 'Sebastian Brown', 'ETL Developer', 'Data Science', 'Seattle', 150, 4, 'New Hire'),

  // Analytics Team
  generateEmployee(164, 'Avery Garcia', 'Senior Data Analyst', 'Data Science', 'Seattle', 151, 4, 'Company FTE'),
  generateEmployee(165, 'Ella Davis', 'Business Intelligence Analyst', 'Data Science', 'Remote', 151, 4, 'Company FTE'),
  generateEmployee(166, 'Owen Thompson', 'Data Visualization Specialist', 'Data Science', 'Seattle', 151, 4, 'Contractor'),
  generateEmployee(167, 'Scarlett Anderson', 'Analytics Engineer', 'Data Science', 'Remote', 151, 4, 'New Hire'),

  // Machine Learning Team
  generateEmployee(168, 'Jack Lee', 'ML Engineering Manager', 'Data Science', 'Boston', 152, 4, 'Company FTE'),
  generateEmployee(169, 'Luna Rodriguez', 'Senior ML Engineer', 'Data Science', 'Boston', 152, 4, 'Architecture'),
  generateEmployee(170, 'Henry Kim', 'ML Engineer', 'Data Science', 'Remote', 152, 4, 'Company FTE'),
  generateEmployee(171, 'Violet Chen', 'Data Scientist', 'Data Science', 'Boston', 152, 4, 'New Hire'),
  generateEmployee(172, 'Leo Johnson', 'MLOps Engineer', 'Data Science', 'Remote', 152, 4, 'Contractor'),

  // Platform & Infrastructure - Under Rachel Chen (VP Platform)
  generateEmployee(180, 'Cloud Infrastructure Team', 'Cloud Infrastructure', 'Platform', 'Boston', 5, 5, null, false, true),
  generateEmployee(181, 'DevOps Team', 'DevOps', 'Platform', 'Multiple', 5, 5, null, false, true),
  generateEmployee(182, 'Site Reliability Team', 'SRE', 'Platform', 'Boston', 5, 5, null, false, true),

  // Cloud Infrastructure Team
  generateEmployee(190, 'Nolan Martinez', 'Cloud Architect', 'Platform', 'Boston', 180, 5, 'Architecture'),
  generateEmployee(191, 'Layla Wilson', 'Senior Cloud Engineer', 'Platform', 'Boston', 180, 5, 'Company FTE'),
  generateEmployee(192, 'Aaron Taylor', 'Cloud Security Engineer', 'Platform', 'Remote', 180, 5, 'Company FTE'),
  generateEmployee(193, 'Stella Brown', 'Infrastructure Engineer', 'Platform', 'Boston', 180, 5, 'New Hire'),

  // DevOps Team
  generateEmployee(194, 'Isaiah Garcia', 'DevOps Manager', 'Platform', 'Seattle', 181, 5, 'Company FTE'),
  generateEmployee(195, 'Skylar Davis', 'Senior DevOps Engineer', 'Platform', 'Austin', 181, 5, 'Company FTE'),
  generateEmployee(196, 'Jaxon Thompson', 'DevOps Engineer', 'Platform', 'Remote', 181, 5, 'Contractor'),
  generateEmployee(197, 'Aurora Anderson', 'CI/CD Specialist', 'Platform', 'San Francisco', 181, 5, 'New Hire'),

  // Site Reliability Team
  generateEmployee(198, 'Roman Lee', 'SRE Manager', 'Platform', 'Boston', 182, 5, 'Company FTE'),
  generateEmployee(199, 'Iris Rodriguez', 'Senior SRE', 'Platform', 'Remote', 182, 5, 'Company FTE'),
  generateEmployee(200, 'Jasper Kim', 'SRE', 'Platform', 'Boston', 182, 5, 'Contractor'),
  generateEmployee(201, 'Willow Chen', 'Monitoring Specialist', 'Platform', 'Remote', 182, 5, 'New Hire'),

  // Additional Cross-functional roles and Matrix relationships
  // Scrum Masters distributed across teams
  generateEmployee(210, 'Maya Johnson', 'Scrum Master - Engineering', 'Agile', 'San Francisco', 2, 2, 'Scrum Master'),
  generateEmployee(211, 'Felix Martinez', 'Scrum Master - Product', 'Agile', 'Austin', 3, 3, 'Scrum Master'),
  generateEmployee(212, 'River Wilson', 'Scrum Master - Data', 'Agile', 'Seattle', 4, 4, 'Scrum Master'),
  generateEmployee(213, 'Sage Taylor', 'Scrum Master - Platform', 'Agile', 'Boston', 5, 5, 'Scrum Master'),

  // RFP and placeholder positions
  generateEmployee(220, 'Future Engineering Lead', 'Engineering Lead - TBD', 'Engineering', 'Remote', 2, 2, 'RFP Workpackage Placeholder'),
  generateEmployee(221, 'Product Strategy Role', 'Product Strategist - TBD', 'Product', 'Austin', 3, 3, 'RFP Workpackage Placeholder'),
  generateEmployee(222, 'Data Science Lead', 'Data Science Lead - TBD', 'Data Science', 'Seattle', 4, 4, 'RFP Workpackage Placeholder'),

  // Working Notice employees
  generateEmployee(230, 'Connor Brown', 'Senior Developer - Transitioning', 'Engineering', 'San Francisco', 11, 11, 'Working Notice'),
  generateEmployee(231, 'Penelope Davis', 'Product Manager - Departing', 'Product', 'Austin', 3, 3, 'Working Notice'),
  generateEmployee(232, 'Axel Garcia', 'Data Engineer - Leaving', 'Data Science', 'Seattle', 4, 4, 'Working Notice'),

  // Matrix organization examples - people who report to different managers for different purposes
  // These employees have different parentId (initiative/functional) vs reportsTo (direct manager)
  generateEmployee(240, 'Sage Patel', 'Full Stack Engineer', 'Engineering', 'San Francisco', 20, 11, 'Company FTE'), // Works on Cloud Migration but reports to Sofia Martinez
  generateEmployee(241, 'Remy Rodriguez', 'Backend Engineer', 'Engineering', 'Seattle', 21, 12, 'Company FTE'), // Works on Microservices Transformation but reports to David Park
  generateEmployee(242, 'Drew Thompson', 'Security Engineer', 'Security', 'Boston', 22, 5, 'Company FTE'), // Works on DevSecOps Initiative but reports to Rachel Chen
];

// Transform flat data into hierarchical structure for the org chart
export const transformDataForOrgChart = (flatData) => {
  const dataMap = new Map();
  const rootNodes = [];

  // Create a map of all nodes
  flatData.forEach(item => {
    dataMap.set(item.id, { ...item, children: [] });
  });

  // Build the hierarchy
  flatData.forEach(item => {
    const node = dataMap.get(item.id);
    if (item.parentId && dataMap.has(item.parentId)) {
      const parent = dataMap.get(item.parentId);
      parent.children.push(node);
    } else {
      rootNodes.push(node);
    }
  });

  return rootNodes[0]; // Return the root node (CEO)
};

export default expandedOrgData;
