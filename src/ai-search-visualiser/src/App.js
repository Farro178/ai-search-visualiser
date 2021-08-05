// React app initially generated using "npx create-react-app ai-search-visualiser" command - https://github.com/facebook/create-react-app

import React from 'react';
import { Canvas } from './components/Canvas';
import Navbar from './components/Navbar/Navbar'
import './App.css';

function App() {
  return (
      <div className= "App">
        <Navbar />
        <Canvas />
      </div>
  );
}

export default App;