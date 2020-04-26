import React from 'react';
import './App.css';
import TetrisBoard from './components/TetrisBoard/TetrisBoadrd';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TetrisBoard rows={18} columns={36} />
      </header>
    </div>
  );
}

export default App;
