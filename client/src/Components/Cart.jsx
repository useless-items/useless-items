import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
      const fetchCartItems = async () => {
        // Place seed data here
        // await main();

        const seedProducts = [
          {
              id: 1,
              productName: 'Inferno Knuckles',
              productImgUrl: 'infernoknucks.jpg',
              pennies: 30000,
          },
          {
              id: 2,
              productName: 'Dinosaur taco holder',
              productImgUrl: 'dinotaco.jpg',
              pennies: 20000,
          },
          {
              id: 3,
              productName: 'Something Extra',
              productImgUrl: 'somethingextra.jpg',
              pennies: 18000,
          }
        ];
        setCartItems(seedProducts);
      };

      fetchCartItems();
    }, []);

    useEffect(() => {
      const calculateTotalPrice = () => {
        const total = cartItems.reduce((accumulator, product) => accumulator + (product.pennies / 100), 0);
        setTotalPrice(total);
      };

      calculateTotalPrice();
    }, [cartItems]);


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
                        <h4>Total Price: ${totalPrice}</h4>
                        <button>Check Out</button>
                </div>
            </section>
            
        </>
    )

}
  
export default Cart;