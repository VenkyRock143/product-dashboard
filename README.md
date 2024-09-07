
# React Product Dashboard

A responsive product dashboard built with React that allows users to search, filter, sort, and view details of products fetched from an external API.

**Link:** [Product Dashboard](https://master--venky-product-dashboard.netlify.app/)

## Folder Structure

```sh
React-Product-Dashboard
│
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── ProductDashboard.jsx \
│   │   ├── ProductDetails.jsx 
│   │   ├── ProductList.jsx         
│   │   └── ProductModal.jsx        
│   ├── App.css                      
│   ├── App.js                                    
│   ├── index.css                   
│   └── index.js                    
├── package-lock.json
├── package.json
└── README.md
```


## Overview

By using this app, users can:

- Search: Search for products by title.
- Filter: Filter products based on price range and popularity.
- Sort: Sort products by price or popularity in ascending or descending order.
- Pagination: Navigate through the product list using pagination controls.
- Product Details: View product details in a modal.

## API Information

This app fetches product data from an external API using a CORS proxy service:

- API Endpoint: https://cdn.drcode.ai/interview-materials/products.json
- CORS Proxy: https://api.allorigins.win/get?url=
  
## Installation

To run this app locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/react-product-dashboard.git
cd react-product-dashboard
```
2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```
4. Open your browser and visit http://localhost:3000 to view the app.


## Build for Production
To create a production build of the app:
```bash
npm run build
```
This will generate optimized production files in the build directory.

## Technologies Used
- React.js: For building the user interface.
- CSS: For styling and layout.
- JavaScript: Core logic for the app.
- Fetch API: For making API requests.






