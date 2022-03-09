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
                <div className="single-tile" key={product.id}>
                  <div>
                    <h2>{product.name}</h2>
                  </div>
                  <div>
                    <img className="poster-image" src={product.imageURL} />
                  </div>
                  <div>{product.description}</div>
                  <div>
                    <b>Price:</b> $ {product.price}
                  </div>
                  <div>
                    <b>Quantity:</b> {product.quantity}
                  </div>
                  <div className="button-div">
                    <Link to={`/admin/products/${product.id}/edit`}>
                      <button>Edit</button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => dispatch(destroyProduct(product))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
