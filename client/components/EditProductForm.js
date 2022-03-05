import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../store';

export default function EditProductForm() {
  // pull singleProduct from store
  const singleProduct = useSelector((state) => state.singleProduct);
  // set local state
  const [product, setProduct] = useState(singleProduct);
  //initialize dispatch function
  const dispatch = useDispatch();

  const { name, price, description, imageURL, quantity, available } = product;

  function handleChange(evt) {
    setProduct({
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(updateProduct(singleProduct.id, product));
  }

  return (
    <div className="edit-product-form">
      <form id="edit-product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name </label>
        <input name="name" onChange={handleChange} value={name} />

        <label htmlFor="price">Price </label>
        <input name="price" onChange={handleChange} value={price} />

        <label htmlFor="description">Description </label>
        <input name="description" onChange={handleChange} value={description} />

        <label htmlFor="imageURL">ImageURL </label>
        <input name="imageURL" onChange={handleChange} value={imageURL} />
        <label htmlFor="quantity">Quantity </label>
        <input name="quantity" onChange={handleChange} value={quantity} />
        <label htmlFor="available">Available </label>
        <input name="available" onChange={handleChange} value={available} />

        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}
