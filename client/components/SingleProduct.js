import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct, addItemToCart } from '../store';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      quantity: 0,
      available: true,
      imageURL: '',
    };
    this.state = { ...this.initialState };
  }

  async componentDidMount() {
    await this.props.fetchProduct(this.props.match.params.productId);
    this.setState({ ...this.props.singleProduct });
  }
  render() {
    const { imageURL, name, price, description, quantity, available } =
      this.state;
    return (
      <div>
        <h3>Selected poster:</h3>
        <hr />
        <h1>{name}</h1>
        <img src={imageURL} />
        <p>{description}</p>
        <p>${price}</p>
        <p>
          {available
            ? 'this item is available'
            : 'this item is currently unavailable'}
        </p>
        <p>{quantity} left in stock</p>
        {available ? (
          <button
            onClick={async () => {
              if (window.localStorage.getItem('token')) {
                await this.props.addItemToCart(this.state.id);
              } else {
                const cart = JSON.parse(
                  window.localStorage.getItem('guestCart')
                );
                const updateItem = cart.findIndex(
                  (item) => item.id === this.state.id
                );
                if (updateItem >= 0) {
                  cart[updateItem].quantity++;
                } else {
                  cart.push({
                    id: this.state.id,
                    quantity: 1,
                    price: product.price,
                    product: this.state,
                  });
                }
                const guestCart = JSON.stringify(cart);
                window.localStorage.setItem('guestCart', guestCart);
              }
            }}
            type='button'
          >
            Add To Cart
          </button>
        ) : null}
        <hr />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
    addItemToCart: (productId) => dispatch(addItemToCart(productId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
