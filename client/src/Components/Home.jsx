import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails.jsx";

const Home = ({ addToCart: addToCartProp }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  // Event handler to update the search query

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const addToCart = async (product) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          pennies: product.pennies,
          shoppingCartId: product.id,
        }),
      });

      if (response.ok) {
        setCartItems([product, ...cartItems]);
        console.log('Item added to cart successfully');
      } else {
        console.error('Error adding to cart');
      }
    } catch (error){
      console.error('Error adding to cart:', error);
    };
  }


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

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

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
            <h3>Price: {product.pennies}</h3>
            <h3>Description: {product.description}</h3>
            <h3>{product.productImgUrl}</h3>
            <h3>Rating: {product.productRating}</h3>
            <h3>Stock: {product.stock}</h3>
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

