import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams(); // Ensure productId is being extracted correctly
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://cdn.drcode.ai/interview-materials/products.json');
        const data = await response.json();

        // The products are within the `products` object, so we need to adjust the search
        const productsArray = Object.values(data.products); // Access products array
        const foundProduct = productsArray.find(p => p.id === parseInt(productId)); // Match product by id

        if (!foundProduct) {
          throw new Error('Product not found');
        }
        setProduct(foundProduct);
      } catch (err) {
        setError(`Failed to fetch product details: ${err.message}`);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (error) {
    return <div>{error}</div>;
  }

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
