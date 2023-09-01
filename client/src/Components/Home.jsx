import React, { useState, useEffect } from "react";

const Home = ({ addToCart: addToCartProp }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
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
      const result = await fetch('/api/products');
      const data = await result.json();
      setAllProducts(data)
      console.log(data)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

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
          <div key={products.id}>
            <h1>{products.productName}</h1>
            <h3>Price: {products.pennies}</h3>
            <h3>Description: {products.description}</h3>
            <h3>{products.productImgUrl}</h3>
            <h3>Rating: {products.productRating}</h3>
            <h3>Stock: {products.stock}</h3>

            <button onClick={() => addToCart(products)}>Add to Cart</button>

            {/* <button onClick={() => handleProductsDelete(products.id)}>Delete</button> */}
          </div>
        )
      })
    }

    </div>
  );
};

export default Home;