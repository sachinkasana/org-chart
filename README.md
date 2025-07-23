# Organization Chart

An interactive organizational chart built with React and d3-org-chart library.

## Features

- **Interactive Visualization**: Click to expand/collapse nodes
- **Search Functionality**: Search by name, position, or department
- **Responsive Design**: Works on desktop and mobile devices
- **Control Buttons**: Fit to screen, expand all, collapse all
- **Customizable Styling**: Easy to modify colors, fonts, and layout

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Data Structure

The org chart expects data in a flat array format with the following structure:

```javascript
const orgData = [
  {
    id: 1,
    parentId: null, // null for root node
    name: "John Smith",
    positionName: "CEO",
    department: "Executive",
    email: "john.smith@company.com",
    phone: "+1-555-0001"
  },
  {
    id: 2,
    parentId: 1, // references parent's id
    name: "Sarah Johnson",
    positionName: "CTO",
    department: "Technology",
    email: "sarah.johnson@company.com",
    phone: "+1-555-0002"
  }
  // ... more employees
];
```

## Available Controls

- **Search**: Type in the search box to filter employees
- **Fit to Screen**: Auto-zoom to fit the entire chart in view
- **Expand All**: Show all organizational levels
- **Collapse All**: Collapse all nodes to show only top level

## File Structure

```
src/
├── components/
│   ├── OrgChart.js              # Main chart component
│   ├── OrgChartWithSearch.js    # Chart with search functionality
│   └── DatasetStats.js          # Dataset statistics component
├── data/
│   └── expandedOrgData.js       # Comprehensive organizational data (200+ employees)
├── App.js                       # Main application component
├── App.css                      # Application styles
└── index.js                     # Application entry point
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
