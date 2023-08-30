import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ token }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
        calculateTotalPrice(data.cartItems);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (accumulator, product) => accumulator + product.price,
      0
    );
    setTotalPrice(total);
  };

  const addToCart = async () => {
    try {
      if (selectedProduct) {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(selectedProduct), // Use selectedProduct
        });

        if (response.ok) {
          await fetchCartItems();
        } else {
          console.error('Failed to add item to cart');
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <>
      <div id='cart'>
        <section>
          <div className='container'>
            {cartItems.map((product) => (
              <div className='product' key={product.id}>
                <h3>{product.productName}</h3>
                <h4>Price: ${product.price}</h4>
              </div>
            ))}
          </div>
        </section>
        <div className='total'>
          <h4>Total Price: ${totalPrice}</h4>
          <button onClick={addToCart}>Add to Cart</button>
          <Link to='/checkout' className='linkstyle'>
            <button>Check Out</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
