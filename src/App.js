import React from 'react';

import './App.scss';
import TransferMarket from './pages/transferMarket';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="game">
          <TransferMarket />
        </div>
      </div>
    </div>
  );
}

export default App;
