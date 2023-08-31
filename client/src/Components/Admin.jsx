import { useEffect, useState } from "react";
import ProductForm from './ProductForm';





const Admin = ({token}) => {
  const [allUsers, setAllUsers] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [isProductFormOpen, setProductFormOpen] = useState(false);
  const isAdmin = true;


  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const result = await fetch('/api/users');
        const data = await result.json();
        console.log(data)
        setAllUsers(data)
      }catch(err){
        console.log(err)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetch('/api/products');
      const data = await result.json();
      setAllProducts(data)
      console.log(data)
    }
    fetchProducts()
  }, [])

const handleUserDelete = async (userId) => {
  try{
    await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })
    setAllUsers((prevUsers) => 
    prevUsers.filter((user) => user.id !== userId));
  } catch(err){
    console.log(err)
  }
}

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
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Product successfully posted.');
    } else {
      alert('Failed to post product.');
    }
  } catch (error) {
    console.error(error);
  }
};

const handleProductForm = () => {
  setProductFormOpen(!isProductFormOpen);
};

  if(isAdmin){
    return(
      <>
    <h1>Admin portal</h1>
    <button onClick={handleProductForm}>Post Product</button>
    {isProductFormOpen && (
        <ProductForm handleProductSubmit={handleProductSubmit} />
      )}
    {
      allUsers.map((users) => {
        return(
          <>
          <h1 key={users.id}>Firstname: {users.firstName}</h1>
          <h3>Lastname: {users.lastName}</h3>
          <h3>Email:{users.email}</h3>
          <h3>Username: {users.username}</h3>
          <h3>Password: {users.password}</h3>
          <button onClick={() => handleUserDelete(users.id)}>Delete</button>
          </>
        )
      })
    }
    <h1>PRODUCTS</h1>
    {
      allProducts.map((products) => {
        return(
          <>
            <h1 key={products.id}>{products.productName}</h1>
            <h3>Price: {products.pennies}</h3>
            <h3>Description: {products.description}</h3>
            <h3>{products.productImgUrl}</h3>
            <h3>Rating: {products.productRating}</h3>
            <h3>Stock: {products.stock}</h3>
            <button onClick={() => handleProductsDelete(products.id)}>Delete</button>
          </>
        )
      })
    }
      </>
    );
  } else{
    return <h1>no work</h1>
  }
}


export default Admin;
