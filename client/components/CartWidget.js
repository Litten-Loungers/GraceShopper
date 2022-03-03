import React from 'react';
import { connect } from 'react-redux';
import { fetchCartItems } from '../store';

class CartWidget extends React.Component {
  constructor() {
    super();
    this.initialState = {
      cartItems: [],
    };
    this.state = { ...this.initialState };
  }

  async componentDidMount() {
    await this.props.fetchCartItems(this.props.userId);
    this.setState({ cartItems: this.props.cartItems });
  }

  render() {
    return <div>Items in cart: {this.state.cartItems.length}</div>;
  }
}

const mapState = (state) => {
  return {
    cartItems: state.cartItems,
    userId: state.auth.id,
  };
};

// ! add thunk creator to fetchCartItems for current userId and NEW order status
const mapDispatch = (dispatch) => {
  return {
    fetchCartItems: (id) => dispatch(fetchCartItems(id)),
  };
};

export default connect(mapState, mapDispatch)(CartWidget);
