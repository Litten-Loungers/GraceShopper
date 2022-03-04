import React from 'react';
import { connect } from 'react-redux';
import auth from '../store/auth';
import {
  fetchCartItems,
  addItemToCart,
  destroyItem,
  decrementItem,
} from '../store';
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
              <button
                type="button"
                onClick={async () => {
                  if (item.quantity > 1) {
                    await this.props.decrementItem(item);
                    this.setState((prevState) => ({
                      cartItems: prevState.cartItems.map((lineItem) => {
                        if (lineItem.id === item.id) {
                          return {
                            ...lineItem,
                            quantity: lineItem.quantity - 1,
                          };
                        } else {
                          return lineItem;
                        }
                      }),
                    }));
                  } else {
                    await this.props.destroyItem(item.id);
                    this.setState((prevState) => ({
                      cartItems: prevState.cartItems.filter(
                        (lineItem) => lineItem.id !== item.id
                      ),
                    }));
                  }
                }}
              >
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
              <button
                type="button"
                onClick={async () => {
                  await this.props.destroyItem(item.id);
                  this.setState((prevState) => ({
                    cartItems: prevState.cartItems.filter(
                      (lineItem) => lineItem.id !== item.id
                    ),
                  }));
                }}
              >
                Remove From Cart
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
    destroyItem: (id) => dispatch(destroyItem(id)),
    decrementItem: (item) => dispatch(decrementItem(item)),
  };
};

export default connect(mapState, mapDispatch)(Order);
