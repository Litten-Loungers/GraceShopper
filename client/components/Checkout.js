import React from 'react';
import { connect } from 'react-redux';
import { fetchCartItems, purchaseProduct, completeOrder } from '../store';

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
    await this.props.fetchCartItems();
    this.setState({
      items: this.props.items,
    });
  }

  render() {
    const { items } = this.state;
    const total = items.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    return (
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
          type="button"
          onClick={async () => {
            items.forEach(async (item) => {
              await this.props.purchaseProduct(item.product.id, {
                quantity: item.product.quantity - item.quantity,
              });
            });
            await this.props.completeOrder();
            this.setState({
              items: [],
              thankYou: 'Order confirmed! Thank you for shopping with us!',
            });
          }}
        >
          Confirm Order
        </button>
        <h2>{this.state.thankYou}</h2>
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
