import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, addItemToCart } from '../store';

class AllProducts extends React.Component {
  constructor() {
    super();
    this.initialState = {
      products: [],
      id: 0,
    };
    this.state = { ...this.initialState };
  }
  async componentDidMount() {
    await this.props.fetchProducts();
    this.setState({ products: this.props.products, id: this.props.userId });
  }
  render() {
    const { products } = this.state;
    return (
      <div>
        {products
          .sort((x, y) => {
            return x.id - y.id;
          })
          .map((product) => {
            return (
              <div key={product.id}>
                <h2>Name: {product.name}</h2>
                <img src={product.imageURL} />
                <p>Price: {product.price}</p>
                <p>{product.description}</p>
                <p>Quantity: {product.quantity}</p>
                {product.available ? (
                  <button
                    type="button"
                    onClick={this.props.addItemToCart(
                      this.state.id,
                      product.id
                    )}
                  >
                    Add To Cart
                  </button>
                ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
