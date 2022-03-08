import React from 'react';
import { connect } from 'react-redux';
import { fetchCartItems, purchaseProduct, completeOrder } from '../store';
import { Link } from 'react-router-dom';

class Checkout extends React.Component {
  constructor() {
    super();
    this.initialState = {
      items: [],
      thankYou: '',
    };
    this.state = { ...this.initialState };
  }

  async componentDidMount() {
    if (window.localStorage.getItem('token')) {
      await this.props.fetchCartItems();
      this.setState({
        items: this.props.items,
      });
    } else {
      this.setState({
        items: [...JSON.parse(window.localStorage.getItem('guestCart'))],
      });
    }
  }

  async handleComplete(items) {
    items.forEach(async (item) => {
      await this.props.purchaseProduct(item.product.id, {
        quantity: item.product.quantity - item.quantity,
      });
    });
    if (window.localStorage.getItem('token')) {
      await this.props.completeOrder();
    } else {
      window.localStorage.setItem('guestCart', JSON.stringify([]));
    }
    this.setState({
      items: [],
      thankYou: 'Order confirmed! Thank you for shopping with us!',
    });
  }

  render() {
    const { items } = this.state;
    const total = items.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    // if (items === []) {
    //   let renderAll = false;
    // } else {
    //   let renderAll = true;
    // }

    return (
      <div>
        {items.length > 0 ? (
          <div>
            <p>total: ${total}</p>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.product.name}</p>
                  <p>{item.quantity}</p>
                  <p>Cost: {item.price}</p>
                </div>
              );
            })}
            <button
              type='button'
              onClick={async () => {
                this.handleComplete(items);
              }}
            >
              Confirm Order
            </button>
            <h2>{this.state.thankYou}</h2>
          </div>
        ) : (
          <div>
            <h2>{this.state.thankYou}</h2>
            <Link to={'/products'}>
              <button>Continue Shopping</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
    items: state.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartItems: () => dispatch(fetchCartItems()),
    purchaseProduct: (id, updates) => dispatch(purchaseProduct(id, updates)),
    completeOrder: () => dispatch(completeOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
