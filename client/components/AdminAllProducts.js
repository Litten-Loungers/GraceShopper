import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, destroyProduct } from '../store';

export default function AdminAllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <div>
        <h3>Admin / Manage Products: </h3>
      </div>
      <div>
        <Link to={'/admin/products/add'}>
          <button>Add Product</button>
        </Link>
      </div>
      <hr />
      <div className="all-products">
        {products
          .sort((x, y) => {
            return x.id - y.id;
          })
          .map((product) => {
            return (
              <div key={product.id}>
                <h2>Name: {product.name}</h2>
                <img src={product.imageURL} />
                <p>Price: $ {product.price}</p>
                <p>{product.description}</p>
                <p>Quantity: {product.quantity}</p>
                <Link to={`/admin/products/${product.id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button
                  type="button"
                  onClick={() => dispatch(destroyProduct(product.id))}
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
