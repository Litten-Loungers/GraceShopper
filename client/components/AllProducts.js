import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store';

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
    const { products } = this.state;
    return (
      <div className='all-products'>
        {products
          .sort((x, y) => {
            return x.id - y.id;
          })
          .map((product) => {
            return (
              <div className='singleProduct' key={product.id}>
                <div className='moviePic'><img src={product.imageURL} />
                <p>{product.name}</p></div>
                <div className='button'><p>Price: {product.price}</p>
                {product.available ? (
                  <button type='button'>Add To Cart</button>
                ) : null}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
