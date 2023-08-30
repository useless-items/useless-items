import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({token}) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

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

  const addToCart = async (product) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        await fetchCartItems();
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <>
      <div id='cart'>
        {/* ... (rest of the component remains the same) */}
        <div className='total'>
          <h4>Total Price: ${totalPrice}</h4>
          <button onClick={() => addToCart(selectedProduct)}>
            Add to Cart
          </button>
          <Link to='/checkout' className='linkstyle'>
            <button>Check Out</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
