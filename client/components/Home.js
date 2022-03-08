import React from 'react';
import { connect } from 'react-redux';

export const Home = (props) => {
  const { username, isAdmin } = props;

  return (
    <div className="landingPage">
      {!isAdmin ? 
      (<h1>Welcome, {username}</h1>
      ) : 
      (<h1>Welcome, administrator</h1>)}

    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
    isAdmin: state.auth.type === 'ADMIN'
  };
};

export default connect(mapState)(Home);
