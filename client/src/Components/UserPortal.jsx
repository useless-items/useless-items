import { useEffect, useState } from "react";
import ProductForm from './ProductForm';





const UserPortal = ({token, userId}) => {
  const [allProducts, setAllProducts] = useState([])
  const [isProductFormOpen, setProductFormOpen] = useState(false);
  
  // const isAdmin = true;


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try{
  //       const result = await fetch('/api/users');
  //       const data = await result.json();
  //       console.log(data)
  //       setAllUsers(data)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }
  //   fetchUsers()
  // }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await fetch("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await result.json();
        setAllProducts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [token]);



const handleProductsDelete = async (productId) => {
  try{
    await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    })
    setAllProducts((prevProducts) => 
    prevProducts.filter((product) => product.id !== productId));
  } catch(err){
    console.log(err)
  }
}

const handleProductSubmit = async (formData) => {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Product successfully posted.");
    } else {
      alert("Failed to post product.");
    }
  } catch (error) {
    console.error(error);
  }
};


const handleProductForm = () => {
  setProductFormOpen(!isProductFormOpen);
};

  
return (
  <>
    <h1 id="portalfont">User Portal</h1>
    <button onClick={handleProductForm} id="portalbutton">Post Product</button>
    {isProductFormOpen && <ProductForm handleProductSubmit={handleProductSubmit} />}
    {allProducts.map((product) => {
      const isUserProduct = product.user.id === userId; 
      console.log('Is User Product:', isUserProduct);
      return (
        <div key={product.id} id="userportal">
          <h1>{product.productName}</h1>
          <h3>Price: {product.pennies}</h3>
          <h3>Description: {product.description}</h3>
          <img src={product.productImgUrl} />
          <h3>Rating: {product.productRating}</h3>
          <h3>Stock: {product.stock}</h3>
          {isUserProduct && (
            <>
              {/* <button onClick={() => handleEditProduct(product.id)}>Edit</button> */}
              <button onClick={() => handleProductsDelete(product.id)}>Delete</button>
            </>
          )}
        </div>
      );
    })}
  </>
 );
}


export default UserPortal;
