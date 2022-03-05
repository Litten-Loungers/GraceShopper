import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    return (
      <Link to="/cart">
        <div>Items in cart: {this.props.cartItems.length}</div>
      </Link>
    );
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
