import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addItemToCart } from '../store';

class AllProducts extends React.Component {
  constructor() {
    super();
    this.initialState = {
      products: [],
    };
    this.state = { ...this.initialState };
  }
  async componentDidMount() {
    await this.props.fetchProducts();
    this.setState({ products: this.props.products });
  }
  render() {
    console.log(this.props.userId);
    console.log(this.state);
    const { products } = this.state;
    return (
      <div className="all-products">
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
                {product.available ? (
                  <button
                    type="button"
                    onClick={async () => {
                      console.log(this.props.userId);
                      if (this.props.userId) {
                        await this.props.addItemToCart(
                          this.props.userId,
                          product.id
                        );
                      } else {
                        const cart = JSON.parse(
                          window.localStorage.getItem('guestCart')
                        );
                        console.log(cart);
                        const updateItem = cart.findIndex(
                          (item) => item.id === product.id
                        );
                        console.log(updateItem);
                        if (updateItem >= 0) {
                          cart[updateItem].quantity++;
                        } else {
                          cart.push({ id: product.id, quantity: 1 });
                        }
                        const guestCart = JSON.stringify(cart);
                        window.localStorage.setItem('guestCart', guestCart);
                      }
                    }}
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
