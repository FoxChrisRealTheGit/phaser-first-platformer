import React, { Component } from 'react';
import FirstPlatformer from './Game';
import './App.css';

class App extends Component {
  render() {
    FirstPlatformer();
    return (
      <div className="myCanvas">

      </div>
    );
  }
}

export default App;
