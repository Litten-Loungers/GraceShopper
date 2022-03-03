import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: '',
      price: 0,
      description: '',
      quantity: 0,
      available: true,
      imageURL: '',
    };
    this.state = { ...this.initialState };
  }

  async componentDidMount() {
    //update product ID to retreive the product
    await this.props.fetchProduct(this.props.match.params.productId);
    this.setState({ ...this.props.singleProduct });
  }
  render() {
    const { imageURL, name, price, description, quantity, available } =
      this.state;
    return (
      <div>
        <img src={imageURL} />
        <h1>{name}</h1>
        <p>{description}</p>
        <p>${price}</p>
        <p>
          {available
            ? 'this item is available'
            : 'this item is currently unavailable'}
        </p>
        <p>{quantity} left in stock</p>
        {available ? <button type='button'>Add To Cart</button> : null}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
