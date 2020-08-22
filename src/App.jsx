import React from 'react';
import './App.scss';
import PlayedWithTable from './components/PlayedWithTable/PlayedWithTable';

const MOCK_DATA = [{
  player: 'Zarozz',
  games: 25, 
  wins: 15,
  losses: 10, 
  winRate: 15/25
}];


function App() {

  const handleSubmit = (event) => {
    event.preventDefault();
    event.log(event);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Project 0</h1>
        <form onSubmit={handleSubmit} className="form">
          <input className="form__input" type="text" />
          <button className="form__button" type="submit">Check Player</button>
        </form>
        <PlayedWithTable players={MOCK_DATA} />
      </header>
    </div>
  );
}

export default App;
