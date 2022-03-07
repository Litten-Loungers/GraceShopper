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
    if (window.localStorage.getItem('token')) {
      await this.props.fetchCartItems(this.props.userId);
      this.setState({ cartItems: this.props.cartItems });
    } else {
      this.setState({
        cartItems: [...JSON.parse(window.localStorage.getItem('guestCart'))],
      });
    }
  }

  async handleDec(item) {
    if (window.localStorage.getItem('token')) {
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
    } else {
      const guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
      const newCart = guestCart
        .map((lineItem) => {
          if (lineItem.id === item.id) {
            return { ...lineItem, quantity: lineItem.quantity - 1 };
          } else {
            return lineItem;
          }
        })
        .filter((lineItem) => lineItem.quantity > 0);
      this.setState({ cartItems: [...newCart] });
      window.localStorage.setItem('guestCart', JSON.stringify(newCart));
    }
  }

  async handleInc(item) {
    if (window.localStorage.getItem('token')) {
      await this.props.addItemToCart(item.product.id);
      this.setState((prevState) => ({
        cartItems: prevState.cartItems.map((lineItem) => {
          if (lineItem.id === item.id) {
            return { ...lineItem, quantity: lineItem.quantity + 1 };
          } else {
            return lineItem;
          }
        }),
      }));
    } else {
      const guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
      const newCart = guestCart.map((lineItem) => {
        if (lineItem.id === item.id) {
          return { ...lineItem, quantity: lineItem.quantity + 1 };
        } else {
          return lineItem;
        }
      });
      this.setState({ cartItems: [...newCart] });
      window.localStorage.setItem('guestCart', JSON.stringify(newCart));
    }
  }

  async handleRemove(item) {
    if (window.localStorage.getItem('token')) {
      await this.props.destroyItem(item.id);
      this.setState((prevState) => ({
        cartItems: prevState.cartItems.filter(
          (lineItem) => lineItem.id !== item.id
        ),
      }));
    } else {
      const guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
      const newCart = guestCart.filter((lineItem) => lineItem.id !== item.id);
      this.setState({ cartItems: [...newCart] });
      window.localStorage.setItem('guestCart', JSON.stringify(newCart));
    }
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        {cartItems.map((item, idx) => {
          return (
            <div className="singleOrder" key={`id_${idx}`}>
              <p>ORDER ID: {item.orderId}</p>
              <p>ITEM QUANTITY: {item.quantity}</p>{' '}
              <button
                type="button"
                onClick={async () => {
                  this.handleDec(item);
                }}
              >
                -
              </button>
              <button
                type="button"
                onClick={async () => {
                  this.handleInc(item);
                }}
              >
                +
              </button>
              <button
                type="button"
                onClick={async () => {
                  this.handleRemove(item);
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
    addItemToCart: (productId) => dispatch(addItemToCart(productId)),
    destroyItem: (id) => dispatch(destroyItem(id)),
    decrementItem: (item) => dispatch(decrementItem(item)),
  };
};

export default connect(mapState, mapDispatch)(Order);
