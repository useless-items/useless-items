import React, { useState, useEffect } from "react";
const Home = () => {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([])
  // Event handler to update the search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetch('/api/products');
      const data = await result.json();
      setAllProducts(data)
      console.log(data)
    }
    fetchProducts()
  }, [])
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
      {
      allProducts.map((products) => {
        return(
          <>
            <h1 key={products.id}>{products.productName}</h1>
            <h3>Price: {products.pennies}</h3>
            <h3>Description: {products.description}</h3>
            <h3>{products.productImgUrl}</h3>
            <h3>Rating: {products.productRating}</h3>
            <h3>Stock: {products.stock}</h3>
            {/* <button onClick={() => handleProductsDelete(products.id)}>Delete</button> */}
          </>
        )
      })
    }
    </div>
  );
};
export default Home;