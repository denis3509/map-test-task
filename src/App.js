import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './components/map/MapContainer'
import Header from './components/header/Header'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <MapContainer/>

      </div>
    );
  }
}

export default App;
