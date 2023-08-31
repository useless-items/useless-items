import React, { useState, useEffect } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await fetch('/api/products');
        const data = await result.json();
        console.log(data);
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const renderProducts = (products) => {
    return products.map((product) => (
      <div key={product.id} className="product">
        <h1>{product.productName}</h1>
        <h3>Price: {product.pennies}</h3>
        <h3>Description: {product.description}</h3>
        <h3>{product.productImgUrl}</h3>
        <h3>Rating: {product.productRating}</h3>
        <h3>Stock: {product.stock}</h3>
      </div>
    ));
  };

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
      {renderProducts(allProducts)}
    </div>
  </div> 
  );
};

export default Home;
