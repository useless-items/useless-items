import React from 'react';

const Checkout = ({ totalPrice }) => {
  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log('Checkout button clicked');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Price: ${totalPrice}</p>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;
