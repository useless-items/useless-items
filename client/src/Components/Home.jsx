import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails.jsx";

const Home = ({ addToCart, cartCounter, setCartCounter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartCounter(cartCounter + 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await fetch('/api/products');
        const data = await result.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('Products in Cart', cartCounter);
  }, [cartCounter]);

  return (
    <div className="products-container">
      <div className="search-bar">
        <h2 id="FindItems">Find Some Weird Items:</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="products">
        {allProducts.map((product) => (
          <div key={product.id} className="product-box">
            <h1>{product.productName}</h1>
            <h3> ${(product.pennies / 100).toFixed(2)}</h3>
            <h3>Description: {product.description}</h3>
            <img src={product.productImgUrl} />
            <h3>Rating: {product.productRating}</h3>
            <h3>Stock: {product.stock}</h3>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button onClick={() => navigate(`/products/${product.id}`)}>View Product Details</button>
            <button onClick={() => handleProductsDelete(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
