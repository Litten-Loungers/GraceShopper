import React from 'react';
import { connect } from 'react-redux';

class EditProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    console.log('test');
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('test');
  }

  render() {
    const { name, price, description, imageURL, quantity, available } =
      this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <div className="edit-product-form">
        <form id="edit-product-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name </label>
          <input name="name" onChange={handleChange} value={name} />

          <label htmlFor="price">Price </label>
          <input name="price" onChange={handleChange} value={price} />

          <label htmlFor="description">Description </label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />

          <label htmlFor="imageURL">ImageURL </label>
          <input name="imageURL" onChange={handleChange} value={imageURL} />
          <label htmlFor="quantity">Quantity </label>
          <input name="quantity" onChange={handleChange} value={quantity} />
          <label htmlFor="available">Available </label>
          <input name="available" onChange={handleChange} value={available} />

          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ project }) => ({
  project,
});

const mapDispatchToProps = (dispatch) => ({
  updateProject: (project) => dispatch(updateProject(project)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectForm);
