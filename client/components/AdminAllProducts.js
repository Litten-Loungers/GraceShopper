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
    await axios.delete(`/api/products/${productId}`);
    await this.props.fetchProducts();
  }

  async componentDidMount() {
    await this.props.fetchProducts();
  }
  render() {
    console.log(this.props.userId);
    console.log(this.state);
    const { products } = this.props;
    return (
      <div>
        <div>
          <h3>Admin / Manage Products: </h3>
        </div>
        <div>
          <Link to={`/admin/products`}>
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
                    type='button'
                    onClick={() => this.removeProduct(product.id)}
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
