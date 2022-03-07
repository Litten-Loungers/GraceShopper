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
      <div className='all-products'>
        {products
          .sort((x, y) => {
            return x.id - y.id;
          })
          .map((product) => {
            return (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <h2>Name: {product.name}</h2>
                </Link>
                <img src={product.imageURL} />
                <p>Price: {product.price}</p>
                <p>{product.description}</p>
                <p>Quantity: {product.quantity}</p>
                <button>Edit</button>
                <button
                  type='button'
                  onClick={() => this.removeProduct(product.id)}
                >
                  Remove
                </button>
                {/* <button
                  type='button'
                  onClick={async () => {
                    await this.props.addItemToCart(
                      this.props.userId,
                      product.id
                    );
                  }}
                >
                  Add To Cart
                </button> */}
              </div>
            );
          })}
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