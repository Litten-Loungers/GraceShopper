import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllProducts from './components/AllProducts';
import AdminAllProducts from './components/AdminAllProducts';
import SingleProduct from './components/SingleProduct';
import Sidebar from './components/Sidebar';
import CartWidget from './components/CartWidget';
import Order from './components/Order';
import Checkout from './components/Checkout';
import EditProductForm from './components/EditProductForm';
import AddProductForm from './components/AddProductForm';
import Users from './components/Users';

class Routes extends Component {
  componentDidMount() {
    const starterCart = JSON.stringify([]);
    if (!window.localStorage.getItem('guestCart')) {
      window.localStorage.setItem('guestCart', starterCart);
    }
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div className='routes'>
        {isLoggedIn ? (
          isAdmin ? (
            <Switch>
              <Route path='/admin/users' component={Users} />
              <Route path='/checkout' component={Checkout} />
              <Route path='/cart' component={Order} />
              <Route path='/testcartwidget' component={CartWidget} />
              <Route path='/home' component={Home} />
              <Route
                exact
                path='/admin/products/:productId/edit'
                component={EditProductForm}
              />
              <Route
                exact
                path='/admin/products/add'
                component={AddProductForm}
              />
              <Route path='/products/:productId' component={SingleProduct} />
              <Route path='/admin/products' component={AdminAllProducts} />
              <Route path='/products' component={AllProducts} />
              <Redirect to='/products' />
            </Switch>
          ) : (
            <Switch>
              <Route path='/checkout' component={Checkout} />
              <Route path='/cart' component={Order} />
              <Route path='/testcartwidget' component={CartWidget} />
              <Route path='/home' component={Home} />
              <Route path='/products/:productId' component={SingleProduct} />
              <Route path='/products' component={AllProducts} />
              <Redirect to='/products' />
            </Switch>
          )
        ) : (
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/products/:productId' component={SingleProduct} />
            <Route exact path='/products' component={AllProducts} />
            <Route path='/' exact component={AllProducts} />
            <Route path='/cart' component={Order} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.type === 'ADMIN',
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
