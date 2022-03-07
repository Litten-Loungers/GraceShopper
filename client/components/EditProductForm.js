import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../store';

export default function EditProductForm() {
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.singleProduct);
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    imageURL: '',
    quantity: 0,
    available: true,
  });

  useEffect(() => {
    setProduct(singleProduct);
  }, []);

  const handleChange = (evt) => {
    setProduct({
      ...product,
      [evt.target.name]: evt.target.value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(updateProduct(product.id, product));
  }

  return (
    <div className="edit-product-form">
      <form id="edit-product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name </label>
        <input name="name" onChange={handleChange} value={product.name} />
        <label htmlFor="price">Price </label>
        <input name="price" onChange={handleChange} value={product.price} />
        <label htmlFor="description">Description </label>
        <input
          name="description"
          onChange={handleChange}
          value={product.description}
        />
        <label htmlFor="imageURL">ImageURL </label>
        <input
          name="imageURL"
          onChange={handleChange}
          value={product.imageURL}
        />
        <label htmlFor="quantity">Quantity </label>
        <input
          name="quantity"
          onChange={handleChange}
          value={product.quantity}
        />
        <label htmlFor="available">Available </label>
        <input
          name="available"
          onChange={handleChange}
          value={product.available}
        />
        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}
