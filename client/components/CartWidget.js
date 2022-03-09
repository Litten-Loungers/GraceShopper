import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCartItems } from '../store';
import { CgShoppingCart } from 'react-icons/cg';

class CartWidget extends React.Component {
  constructor() {
    super();
    this.initialState = {
      cartItems: [],
    };
    this.state = { ...this.initialState };
  }

  async componentDidMount() {
    if (window.localStorage.getItem('token')) {
      await this.props.fetchCartItems();
      this.setState({ cartItems: this.props.cartItems });
    } else {
      this.setState({
        cartItems: [...JSON.parse(window.localStorage.getItem('guestCart'))],
      });
    }
  }

  render() {
    if (window.localStorage.getItem('token')) {
      return (
        <Link to='/cart'>
          <div>
            <CgShoppingCart className='cart-icon' />
            {this.props.cartItems.length}
          </div>
        </Link>
      );
    } else {
      return (
        <Link to='/cart'>
          <div>
            <CgShoppingCart className='cart-icon' />
            {this.state.cartItems.length}
          </div>
        </Link>
      );
    }
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
    fetchCartItems: () => dispatch(fetchCartItems()),
  };
};

export default connect(mapState, mapDispatch)(CartWidget);
