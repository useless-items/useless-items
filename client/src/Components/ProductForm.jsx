import React, { useState } from 'react';

const ProductForm = ({ handleProductSubmit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    pennies: '',
    description: '',
    productImgUrl: '',
    productRating: '',
    stock: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleProductSubmit(formData);
      setFormData({
        productName: '',
        pennies: '',
        description: '',
        productImgUrl: '',
        productRating: '',
        stock: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Post a New Product</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="pennies"
            value={formData.pennies}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Image URL:
          <textarea
            name="productImgUrl"
            value={formData.productImgUrl}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="productRating"
            value={formData.productRating}
            onChange={handleInputChange}
          />
        </label>
        <label>
          stock:
          <input
            type='number'
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
        </label>
      
        <button type="submit">Post Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
