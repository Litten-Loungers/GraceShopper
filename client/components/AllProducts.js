import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addItemToCart, addItemToLocalCart } from '../store';

export default function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const loggedIn = useSelector((state) => !!state.auth.id);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="all-products">
      {products
        .sort((x, y) => {
          return x.id - y.id;
        })
        .map((product) => {
          return (
            <div className="singleProduct" key={product.id}>
              <div className="moviePic">
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageURL} />
                </Link>
                <Link to={`/products/${product.id}`}>
                  <p className="movieTitle">{product.name}</p>
                </Link>
              </div>

              <div className="button">
                <p>${product.price}</p>
                {product.available ? (
                  <button
                    type="button"
                    onClick={async () => {
                      if (loggedIn) {
                        dispatch(addItemToCart(product.id));
                      } else {
                        dispatch(addItemToLocalCart(product));
                      }
                    }}
                  >
                    Add To Cart
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
    </div>
  );
}
