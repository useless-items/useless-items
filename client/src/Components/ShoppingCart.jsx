
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {

    return (
        <>
            <div>
                <Link to='/'>Home</Link>
            </div>

            <section className='cart'>
                <h1>Cart</h1>

                <div className='container'>
                    {cartItems.map((product) => (
                        <div className='product' key={product.id}>
                            <img src={product.productImgUrl} alt={product.productName} />
                            <h3>{product.productName}</h3>
                            <h4>Price: ${product.pennies /100}</h4>
                        </div>
                    ))}
                </div>

                <div className='total'>
                        <h4>Total Price: ${totalPrice /100}</h4>
                        <button>Check Out</button>
                </div>
            </section>
            
        </>
    )

}

export default ShoppingCart;

// {/* <form>
// {/* For each item added */}
// <img src="{productImgUrl}" />
// <h2>{productName}</h2>
// <h3>Quantity: {quantity} </h3>
// <h3>Price: {pennies/100} </h3>
// <h3>Total: {totalPrice} </h3>
// <button>Remove Item</button>

// <button> Check Out </button>
// </form> */}