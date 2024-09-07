
import React, { useEffect, useState } from 'react';
import ProductList from './productList';
import ProductModal from './ProductModal';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState([0, Infinity]);
  const [popularityFilter, setPopularityFilter] = useState([0, Infinity]);
  const [sortType, setSortType] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Proxy URL for resolving CORS issues
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  const targetUrl = 'https://cdn.drcode.ai/interview-materials/products.json';

  const fetchProducts = async () => {
    try {
      const response = await fetch(proxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const rawData = await response.text();
      const parsedResponse = JSON.parse(rawData);
      const productsObject = parsedResponse.contents;
      const productsData = JSON.parse(productsObject);

      const productsArray = Object.values(productsData.products);

      if (Array.isArray(productsArray)) {
        setProducts(productsArray);
        setFilteredProducts(productsArray); // Initialize filtered products
        setError(null);
      } else {
        throw new Error('Data fetched is not in the expected format');
      }
    } catch (error) {
      setError(`Failed to fetch products: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term, price filter, and popularity filter
    const filtered = products.filter((product) => {
      if (!product || typeof product.title !== 'string') return false;

      const matchesSearchTerm = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesPriceFilter =
        product.price >= priceFilter[0] && product.price <= priceFilter[1];

      const matchesPopularityFilter =
        product.popularity >= popularityFilter[0] &&
        product.popularity <= popularityFilter[1];

      return matchesSearchTerm && matchesPriceFilter && matchesPopularityFilter;
    });

    setFilteredProducts(filtered); // Update filtered products based on search and filters
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, priceFilter, popularityFilter, products]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
  };

  const handlePriceFilterChange = (e) => {
    const range = e.target.value.split('-').map(Number);
    setPriceFilter(range);
  };

  const handlePopularityFilterChange = (e) => {
    const range = e.target.value.split('-').map(Number);
    setPopularityFilter(range);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className="container">
      <h1>Product Dashboard</h1>

      {/* Search Bar with Search Button */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      {/* Price Filter */}
      <select onChange={handlePriceFilterChange}>
        <option value="0-Infinity">All Prices</option>
        <option value="0-5000">0-5000</option>
        <option value="5000-10000">5000-10000</option>
        <option value="10000-20000">10000-20000</option>
        <option value="20000-Infinity">20000+</option>
      </select>

      {/* Popularity Filter */}
      <select onChange={handlePopularityFilterChange}>
        <option value="0-Infinity">All Popularity</option>
        <option value="0-10000">0-10000</option>
        <option value="10000-30000">10000-30000</option>
        <option value="30000-50000">30000-50000</option>
        <option value="50000-Infinity">50000+</option>
      </select>

      {/* Sort */}
      <select onChange={handleSortChange}>
        <option value="price-asc">Price Ascending</option>
        <option value="price-desc">Price Descending</option>
        <option value="popularity-asc">Popularity Ascending</option>
        <option value="popularity-desc">Popularity Descending</option>
      </select>

      {/* Product List */}
      <ProductList products={currentProducts} onProductClick={openModal} />

      {/* Pagination */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {/* Modal for Product Details */}
      {isModalOpen && (
        <ProductModal product={selectedProduct} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ProductDashboard;
