import React from 'react';

const ProductModal = ({ product, closeModal }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product.title}</h2>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Popularity:</strong> {product.popularity}</p>
        <p><strong>Description:</strong> {product.description || 'No description available'}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal;
