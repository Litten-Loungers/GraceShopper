import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { BsCart } from 'react-icons/fa';

const App = () => {
  return (
    <div id='main-div'>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
