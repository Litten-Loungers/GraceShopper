import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, addItemToCart } from '../store';

class AllProducts extends React.Component {
  constructor() {
    super();
    this.initialState = {
      products: [],
    };
    this.state = { ...this.initialState };
  }
  async componentDidMount() {
    await this.props.fetchProducts();
    this.setState({ products: this.props.products });
  }
  render() {
    console.log(this.props.userId);
    console.log(this.state);
    const { products } = this.state;
    return (
      <div className="all-products">
        {products
          .sort((x, y) => {
            return x.id - y.id;
          })
          .map((product) => {
            return (
              <div className="singleProduct" key={product.id}>
                <div className="moviePic">
                <Link to={`/products/${product.id}`}><img src={product.imageURL} />
                </Link>
                <Link to={`/products/${product.id}`}><p className="movieTitle">{product.name}</p></Link>
        
                </div>

                <div className="button">
                  <p>${product.price}</p>
                  {product.available ? (
                    <button
                      type="button"
                      onClick={async () => {
                        if (window.localStorage.getItem('token')) {
                          await this.props.addItemToCart(product.id);
                        } else {
                          const cart = JSON.parse(
                            window.localStorage.getItem('guestCart')
                          );
                          const updateItem = cart.findIndex(
                            (item) => item.id === product.id
                          );
                          if (updateItem >= 0) {
                            cart[updateItem].quantity++;
                          } else {
                            cart.push({ id: product.id, quantity: 1, price: product.price, product });
                          }
                          const guestCart = JSON.stringify(cart);
                          window.localStorage.setItem('guestCart', guestCart);
                        }
                      }}
                    >
                      Add To Cart
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addItemToCart: (productId) => dispatch(addItemToCart(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
