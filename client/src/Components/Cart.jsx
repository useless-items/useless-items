import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Cart = ({ token, cartItems, setCartItems, cartCounter, setCartCounter }) => {
  const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (accumulator, product) => {
          return accumulator + product.pennies
        },0);
      setTotalPrice(total/100);
    };

    useEffect(() => {
      calculateTotalPrice();
      setCartCounter(cartItems.length);
    }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const cartItems = await response.json();
        calculateTotalPrice(cartItems);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  const removeFromCart = (productToRemove) => {
    const updatedCart = cartItems.filter(
      (product) => product.id !== productToRemove.id
    );
    setCartItems(updatedCart);
    // calculateTotalPrice(updatedCart);
  };

  const clearTotalCart = () => {
    setCartItems([]);
    // calculateTotalPrice([]);
  }

  return (
    <>
      <div id='cart'>
        <section>
          <div className='container'>
            {cartItems.length === 0 ? (
              <h3>Sorry, your cart is empty!</h3>
            ) : (
              cartItems.map((product) => (
                <div className='cart-product clearfix' key={product.id}>
                  {<h3>{product.productName}</h3>}
                  {<h4>Price: ${product.pennies/100}.00</h4>}
                  {<button onClick={() => removeFromCart(product)}>Remove from Cart</button>}
                </div>
              ))
            )}
          </div>
        </section>
        {cartItems.length > 0 && (
          <div className='total'>
            <div className='cart-counter'>
              <span className='cart-count'>Cart Total: {cartCounter}</span>
            </div>
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4> 
          <Link to='/checkout' className='linkstyle'>
            <button>Check Out</button>
          </Link>
          <button onClick={clearTotalCart}> Clear Cart </button>
        </div>
        )}
      </div>
    </>
  );
};

export default Cart;
