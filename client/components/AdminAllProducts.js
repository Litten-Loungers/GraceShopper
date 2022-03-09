import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addItemToCart } from '../store';

class AdminAllProducts extends React.Component {
  constructor() {
    super();
    this.removeProduct = this.removeProduct.bind(this);
  }

  async removeProduct(productId) {
    const token = window.localStorage.getItem('token');
    await axios.delete(`/api/products/${productId}`, {
      headers: { authorization: token },
    });
    await this.props.fetchProducts();
  }

  async componentDidMount() {
    await this.props.fetchProducts();
  }
  render() {
    const { products } = this.props;
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
        <div className='all-products'>
          {products
            .sort((x, y) => {
              return x.id - y.id;
            })
            .map((product) => {
              return (
                <div className='single-tile' key={product.id}>
                  <div>
                    <h2>{product.name}</h2>
                  </div>
                  <div>
                    <img src={product.imageURL} />
                  </div>
                  <div>{product.description}</div>
                  <div>
                    <b>Price:</b> $ {product.price}
                  </div>
                  <div>
                    <b>Quantity:</b> {product.quantity}
                  </div>
                  <div className='button-div'>
                    <Link to={`/admin/products/${product.id}/edit`}>
                      <button>Edit</button>
                    </Link>
                    <button
                      type='button'
                      onClick={() => this.removeProduct(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addItemToCart: (userId, productId) =>
      dispatch(addItemToCart(userId, productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAllProducts);
