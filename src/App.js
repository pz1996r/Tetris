import React from 'react';
import './App.css';
import TetrisBoard from './components/TetrisBoard/TetrisBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TetrisBoard />
      </header>
    </div>
  );
}

export default App;
