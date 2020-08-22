import React, { useState } from 'react';
import './App.scss';
import PlayedWithTable from './components/PlayedWithTable/PlayedWithTable';

const MOCK_DATA = {"dashorde": [{"player": "Dashorde", "games": "2", "wins": 1, "losses": 1, "winrate": "50.00"}, {"player": "urqt314gf", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Lets Go Gank Bot", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "grandb369", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "rambo779", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "H1FakerBaker", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "RezWez", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "boops2", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "lethal03", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "1M0NSTER1", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, 
{"player": "B1G D1CK DRAVEN", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "MasterMelhem", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Devinu", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "dfadf", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Toltorn", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Kushina ", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "Andrew135", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "natsuba", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "XiaoMing2018", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}]};


function App() {
  const [inputValue, setInputValue] = useState('dashorde');
  const [player, setPlayer] = useState('dashorde');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
  }

  const handleInputChange = (event) => {
    console.log(event);
  }; //setInputValue;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Project 0</h1>
        <form onSubmit={handleSubmit} className="form">
          <input className="form__input" type="text" onChange={handleInputChange} />
          <button className="form__button" type="submit">Check Player</button>
        </form>
        <PlayedWithTable players={MOCK_DATA[player]} />
      </header>
    </div>
  );
}

export default App;
