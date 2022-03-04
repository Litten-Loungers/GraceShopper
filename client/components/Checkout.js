import React from 'react';
import { connect } from 'react-redux';
import { fetchCartItems, updateProduct, completeOrder } from '../store';

class Checkout extends React.Component {
  constructor() {
    super();
    this.initialState = {
      items: [],
    };
    this.state = { ...this.initialState };
  }

  async componentDidMount() {
    await this.props.fetchCartItems(this.props.userId);
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
              await this.props.updateProduct(item.product.id, {
                quantity: item.product.quantity - item.quantity,
              });
            });
          }}
        >
          Confirm Order
        </button>
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
    fetchCartItems: (id) => dispatch(fetchCartItems(id)),
    updateProduct: (id, updates) => dispatch(updateProduct(id, updates)),
    completeOrder: (orderId) => dispatch(completeOrder(orderId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
