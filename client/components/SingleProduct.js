import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store";

const dummyData = {
  name: "Whiplash",
  price: 1000,
  description: "This is a movie poster",
  quantity: 1,
  available: true,
  imageURL: "",
};

export default class SingleProduct extends React.Component {
  constructor() {
    super();
    this.initialState = {
      name: "",
      price: 0,
      description: "",
      quantity: 0,
      available: true,
      imageURL: "",
    };
    this.state = { ...this.initialState };
  }
  componentDidMount() {
    this.setState({ ...dummyData });
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
            ? "this item is available"
            : "this item is currently unavailable"}
        </p>
        <p>{quantity} left in stock</p>
      </div>
    );
  }
}
