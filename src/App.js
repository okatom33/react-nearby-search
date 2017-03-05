import React, { Component } from 'react';
import './App.css';
import GoogleMap from './components/GoogleMap.jsx';
import MyNavbar from './components/Navbar.jsx';
import { Well } from 'react-bootstrap';

const wellStyles = {
  height: 100+'vh',
  margin: 0,
  paddingTop: 80+'px'
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyNavbar></MyNavbar>
        <Well style={wellStyles}>
          <GoogleMap></GoogleMap>
        </Well>
      </div>
    );
  }
}

export default App;
