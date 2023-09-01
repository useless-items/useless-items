import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details based on the product ID from the URL params
    const fetchProductDetails = async (productId) => {
      try {
        const result = await fetch(`/api/products/${productId}`);
        const data = await result.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails(id);
  }, [id]); // Re-fetch when the product ID changes

  if (!product) {
    // Display a loading message or component while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h1>{product.productName}</h1>
      <h3>Price: {product.pennies}</h3>
      <h3>Description: {product.description}</h3>
      <h3>Image URL: {product.productImgUrl}</h3>
      <h3>Rating: {product.productRating}</h3>
      <h3>Stock: {product.stock}</h3>
    </div>
  );
  
}
export default ProductDetails;
