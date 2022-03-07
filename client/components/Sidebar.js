import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div>FILTER BY TYPE</div>
      <div>
        <Link to='/cart'>IN CART</Link>
      </div>
      <div>
        <Link to='/checkout'>CHECK OUT</Link>
      </div>
      <div>
        {' '}
        <Link to='/admin/products'>MANAGE PRODUCTS</Link>
      </div>
    </div>
  );
};

export default connect()(Sidebar);
