import React, { useState, useEffect } from "react";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const Home = () => {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async() => {
      await prisma.product.findMany().then((response) => {
        setProducts(response);
      });
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
            </div>
          ))}
        </div>
    </div>
  );
};

export default Home;
