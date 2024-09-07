import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch('https://cdn.drcode.ai/interview-materials/products.json');
      const products = await response.json();
      const foundProduct = products.find(p => p.id === parseInt(productId));
      setProduct(foundProduct);
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Popularity:</strong> {product.popularity}</p>
      <p><strong>Description:</strong> {product.description || 'No description available'}</p>
    </div>
  );
};

export default ProductDetails;
