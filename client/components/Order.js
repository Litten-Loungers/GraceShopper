import React from 'react';
import { connect } from 'react-redux';
import auth from '../store/auth';
import { fetchCartItems, addItemToCart } from '../store';
import { Link } from 'react-router-dom';

class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
  }

  async componentDidMount() {
    await this.props.fetchCartItems(this.props.userId);
    this.setState({ cartItems: this.props.cartItems });
  }

  render() {
    const { cartItems } = this.state;
    console.log(cartItems);
    return (
      <div>
        {cartItems.map((item, idx) => {
          return (
            <div key={`id_${idx}`}>
              <p>ORDER ID: {item.orderId}</p>
              <p>ITEM QUANTITY: {item.quantity}</p>{' '}
              <button type="button" onClick={() => {}}>
                -
              </button>
              <button
                type="button"
                onClick={async () => {
                  await this.props.addItemToCart(
                    this.props.userId,
                    item.product.id
                  );
                  this.setState((prevState) => ({
                    cartItems: prevState.cartItems.map((lineItem) => {
                      if (lineItem.id === item.id) {
                        return { ...lineItem, quantity: lineItem.quantity + 1 };
                      } else {
                        return lineItem;
                      }
                    }),
                  }));
                }}
              >
                +
              </button>
              <p>PRICE: {item.price}</p>
              <Link to={`/products/${item.product.id}`}>
                <p>Name: {item.product.name}</p>
              </Link>
              <img src={item.product.imageURL} />
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cartItems: state.cartItems,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCartItems: (id) => dispatch(fetchCartItems(id)),
    addItemToCart: (userId, productId) =>
      dispatch(addItemToCart(userId, productId)),
  };
};

export default connect(mapState, mapDispatch)(Order);
