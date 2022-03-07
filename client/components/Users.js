import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store/users';

class Users extends React.Component {
  constructor() {
    super();
    this.initialState = {
      users: [],
    };
    this.state = { ...this.initialState };
  }
  async componentDidMount() {
    await this.props.getUsers();
    this.setState({ users: this.props.users });
  }
  render() {
    console.log(this.props.userId);
    console.log(this.state);
    const { users } = this.state;
    return (
      <div className="all-users">
        {users
          .sort((x, y) => {
            return x.id - y.id;
          })
          .map((users) => {
            return (
              <div className='singlePerson' key={users.id}>
                <Link to={`/users/${users.id}`}>
                  <h2>{users.username}</h2>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
