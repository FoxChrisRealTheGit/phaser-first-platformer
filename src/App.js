import React, { Component } from 'react';
import FirstPlatformer from './Game';
import FirstPlatformerTwo from './GameTwo';
import FirstPlatformerThree from './GameThree';
import './App.css';

class App extends Component {
  render() {
    FirstPlatformerThree();
    return (
      <div id="myCanvas">

      </div>
    );
  }
}

export default App;
