import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, totalPrice }) => {
  return (
    <>
        <div id='cart'>
            <div>
                <h1>Shopping Cart</h1>
            </div>

            <section>
                <div className='container'>
                {cartItems.map((product) => (
                    <div className='product' key={product.id}>
                    <img src={product.productImgUrl} alt={product.productName} />
                    <h3>{product.productName}</h3>
                    <h4>Price: ${product.price}</h4>
                    </div>
                ))}
                </div>
            </section>

                <div className='total'>
                <h4>Total Price: ${totalPrice}</h4>
                {/* /* Link to the Checkout component */}
                <Link to="/checkout" className="linkstyle">
                <button>Check Out</button>
                </Link>
            </div>
        </div>
    </>
  );
};

export default Cart;
