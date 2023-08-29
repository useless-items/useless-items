import React from 'react';

const Cart = ({ cartItems, totalPrice }) => {
  return (
    <>
      <div>
        <h1>Shopping Cart</h1>
      </div>

      <section className='cart'>
        <div className='container'>
          {cartItems.map((product) => (
            <div className='product' key={product.id}>
              <img src={product.productImgUrl} alt={product.productName} />
              <h3>{product.productName}</h3>
              <h4>Price: ${product.price}</h4>
            </div>
          ))}
        </div>

        <div className='total'>
          <h4>Total Price: ${totalPrice}</h4>
          <button>Check Out</button>
        </div>
      </section>
    </>
  );
};

export default Cart;
