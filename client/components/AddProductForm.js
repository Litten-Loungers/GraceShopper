import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

export class AddProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      quantity: 1,
      available: true,
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

  async handleSubmit(event) {
    event.preventDefault(event);
    await axios.post('/api/products/', { ...this.state });
    this.setState({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      quantity: 1,
      available: true,
    });
    this.props.history.push(`/admin/products`);
  }

  render() {
    console.log('ADD PRODUCT RENDER');
    return (
      <div className='add-product-form'>
        <div>
          <h3>Admin / Add Product: </h3>
        </div>
        <hr />
        <form
          id='add-product-form'
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            name='name'
            onChange={(event) => this.handleChange(event)}
            value={this.state.name}
          />

          <label htmlFor='price'>Price: </label>
          <input
            type='text'
            name='price'
            onChange={(event) => this.handleChange(event)}
            value={this.state.price}
          />

          <label htmlFor='description'>Description: </label>
          <textarea
            name='description'
            onChange={(event) => this.handleChange(event)}
            value={this.state.description}
          />

          <label htmlFor='imageURL'>ImageURL: </label>
          <input
            type='text'
            name='imageURL'
            onChange={(event) => this.handleChange(event)}
            value={this.state.imageURL}
          />

          <label htmlFor='quantity'>Quantity: </label>
          <input
            name='quantity'
            onChange={(event) => this.handleChange(event)}
            value={this.state.quantity}
          />

          <label htmlFor='available'>Available: </label>
          <select
            name='available'
            onChange={(event) => this.handleChange(event)}
            value={this.state.available}
          >
            <option value={true}>Available</option>
            <option value={false}>Unavailable</option>
          </select>
          <div>
            <button type='submit' className='submit-btn'>
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null)(AddProductForm);
