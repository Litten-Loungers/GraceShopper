import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Sidebar extends React.Component {
  render() {
    const { isAdmin } = this.props;
    return (
      <div className="sidebar">
        <div>FILTER BY TYPE</div>
        <div>
          <Link to="/cart">IN CART</Link>
        </div>
        <div>
          <Link to="/checkout">CHECK OUT</Link>
        </div>
        {isAdmin ? (
          <div>
            {' '}
            <Link to="/admin/products">MANAGE PRODUCTS</Link>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  isAdmin: state.auth.type === 'ADMIN',
});

export default connect(mapStatetoProps)(Sidebar);
