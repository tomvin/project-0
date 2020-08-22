import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayedWithTable from './components/PlayedWithTable/PlayedWithTable';
import './App.scss';

const MOCK_DATA = {"dashorde": [{"player": "Dashorde", "games": "2", "wins": 1, "losses": 1, "winrate": "50.00"}, {"player": "urqt314gf", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Lets Go Gank Bot", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "grandb369", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "rambo779", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "H1FakerBaker", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "RezWez", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "boops2", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "lethal03", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "1M0NSTER1", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, 
{"player": "B1G D1CK DRAVEN", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "MasterMelhem", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Devinu", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "dfadf", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Toltorn", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Kushina ", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "Andrew135", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "natsuba", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "XiaoMing2018", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}]};

const getPlayerRecords = (playerName) => axios.get(`http://ec2-18-221-150-128.us-east-2.compute.amazonaws.com/winrates/${playerName}`, {
	headers: {
	  'Access-Control-Allow-Origin': '*',
  }
});

const mockGetPlayerRecords = (playerName) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(MOCK_DATA);
  }, 300);
});

function App() {
  const [inputValue, setInputValue] = useState('dashorde');
  const [player, setPlayer] = useState('dashorde');
  const [gameRecords, setGameRecords] = useState([]);
  const [error, setError] = useState();
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    getPlayerRecords(player).then(({data}) => {
      if (!data) {
        setError('Player not found.');
        setSearching(false);
        setGameRecords([]);
        return;
      }

      updateGameRecords(data[player]);
      setSearching(false);
    });
  }, [player]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError();
    setSearching(true);
    setPlayer(inputValue);
  };

  const updateGameRecords = (records) => {
    if (records) {
      const sortedRecords = records.sort((a, b) => b.winrate - a.winrate)
      setGameRecords(sortedRecords);
    } else {
      setError('Player not found.')
      setGameRecords([]);
    }
  };

  const handleInputChange = ({ target }) => setInputValue(target.value);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Project 0</h1>
        <form onSubmit={handleSubmit} className="form">
          <input value={inputValue} className="form__input" type="text" onChange={handleInputChange} />
          <button className="form__button" type="submit">Check Player</button>
        </form>
        {
          error && <p className="error">{error}</p>
        }
        {
          searching && <p>Searching...</p>
        }
        {
          !error && !searching && <PlayedWithTable players={gameRecords} />
        }
      </header>
    </div>
  );
}

export default App;
