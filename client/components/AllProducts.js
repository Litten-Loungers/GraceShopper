import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store";

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
      <div>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <img src={product.imageURL} />
              <p>{product.price}</p>
              <p>{product.description}</p>
              <p>{product.quantity}</p>
              <p>{product.available}</p>
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
