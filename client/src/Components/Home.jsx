import React, { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const response = await axios.get('/api/products.js');
        setProducts(response.data);
      } catch (error) {
        console.log('Error fetching products: ', error);
      }
    }
      
    fetchProducts();
  }, []);

  // Event handler to update the search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
        <h2 id="FindItems">Find Some Weird Items:</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Display search results or content */}
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <img src={product.productImgUrl} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p>{product.description}</p>
              <h4>Rating: {product.productRating}</h4>
              <h5>Price: {product.pennies /100}</h5>
              {product.user && (
                <div>
                  <p>User: {product.user.username}</p>
                </div>
              )}
            </div>
          ))}
        </div>
    </div>
  );
};

export default Home;
