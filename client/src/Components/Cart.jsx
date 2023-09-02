import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ token, cartItems, setCartItems, addToCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  
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
        const cartItems = await response.json();
        calculateTotalPrice(cartItems);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotalPrice = (items) => {

    const total = items.reduce(
      (accumulator, product) => {
        return accumulator + product.pennies
      },0);
    setTotalPrice(total/100);
  };

  const removeFromCart = (productToRemove) => {
    const updatedCart = cartProducts.filter(
      (product) => product.id !== productToRemove.id
    );
    setCartProducts(updatedCart);
    setCartItems(updatedCart); // Update the parent component's state as well
  };


  return (
    <>

      <div id='cart'>
        <section>
          <div className='container'>
            {/* {console.log(cartItems)} */}
            {cartItems.map((product) => (
              <div className='product' key={product.id}>
                {console.log(product)}
                {/* {<h1>{product.productName}</h1>} */}
                {/* <h3>{product.productName}</h3>
                {product.price && <h4>Price: ${product.price}</h4>}
                {product && <button onClick={() => removeFromCart(product)}>Remove from Cart</button>} */}
              </div>
            ))}
          </div>
        </section>
        <div className='total'>
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4> 
          <Link to='/checkout' className='linkstyle'>
            <button>Check Out</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
