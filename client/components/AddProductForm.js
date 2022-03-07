import React from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import { fetchRobots } from '../redux/robots';
// import { fetchProjects } from '../redux/projects';

export class AddProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      quantity: '',
      available: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log(product);
    dispatch(updateProduct(product.id, product));
  }

  render() {
    return (
      <div className='add-product-form'>
        <form id='add-product-form' onSubmit={this.handleSubmit()}>
          <label htmlFor='name'>Name </label>
          <input
            type='text'
            name='name'
            onChange={(event) => this.handleChange(event)}
            value={this.state.name}
          />

          <label htmlFor='price'>Price </label>
          <input
            type='text'
            name='price'
            onChange={(event) => this.handleChange(event)}
            value={this.state.price}
          />

          <label htmlFor='description'>Description </label>
          <textarea
            name='description'
            onChange={(event) => this.handleChange(event)}
            value={this.state.description}
          />

          <label htmlFor='imageURL'>ImageURL </label>
          <input
            type='text'
            name='imageURL'
            onChange={(event) => this.handleChange(event)}
            value={this.state.imageURL}
          />

          <label htmlFor='quantity'>Quantity </label>
          <input
            name='quantity'
            onChange={handleChange}
            onChange={(event) => this.handleChange(event)}
            value={this.state.quantity}
          />

          <label htmlFor='available'>Available </label>
          <select
            name='available'
            onChange={(event) => this.handleChange(event)}
            value={this.state.available}
          >
            <option value={true}>Available</option>
            <option value={false}>Unavailable</option>
          </select>

          <button type='submit' className='submit-btn'>
            Add
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    // loadRobots: () => dispatch(fetchRobots()),
    // loadProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(null, mapDispatch)(AddProductForm);
