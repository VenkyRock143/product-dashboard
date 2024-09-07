import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products, onProductClick }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    onProductClick(product);
  };

  const handleNavigate = (e, productId) => {
    e.stopPropagation(); // Prevent triggering the modal
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div
          className="product-card"
          key={product.id}
          onClick={() => handleProductClick(product)}
        >
          <h3>{product.title}</h3>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Popularity:</strong> {product.popularity}</p>
          <button onClick={(e) => handleNavigate(e, product.id)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
