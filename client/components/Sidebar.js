import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <p>FILTER BY TYPE</p>

      <Link>IN CART</Link>
      <Link>CHECK OUT</Link>
    </div>
  );
};

export default connect()(Sidebar);
