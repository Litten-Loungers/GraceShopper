import React from 'react';
import { connect } from 'react-redux';
import auth from '../store/auth';

const dummyData = [
  {
    orderId: 1,
    quantity: 1,
    price: 99,
    productId: 1,
  },
  {
    orderId: 1,
    quantity: 2,
    price: 49,
    productId: 2,
  },
  {
    orderId: 1,
    quantity: 1,
    price: 9,
    productId: 3,
  },
];

class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      orderItems: dummyData,
    };
  }

  render() {
    return (
      <div>
        {this.state.orderItems.map((item, idx) => {
          return (
            <div key={`id_${idx}`}>
              <p>ORDER ID: {item.orderId}</p>
              <p>ITEM QUANTITY: {item.quantity}</p>
              <p>PRICE: {item.price}</p>
              <p>PRODUCT ID: {item.productId}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
