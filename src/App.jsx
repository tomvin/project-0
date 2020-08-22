import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayedWithTable from './components/PlayedWithTable/PlayedWithTable';
import './App.scss';

const MOCK_DATA = {"dashorde": [{"player": "Dashorde", "games": "2", "wins": 1, "losses": 1, "winrate": "50.00"}, {"player": "urqt314gf", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Lets Go Gank Bot", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "grandb369", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "rambo779", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "H1FakerBaker", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "RezWez", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "boops2", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "lethal03", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "1M0NSTER1", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, 
{"player": "B1G D1CK DRAVEN", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "MasterMelhem", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Devinu", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "dfadf", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Toltorn", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Kushina ", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "Andrew135", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "natsuba", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "XiaoMing2018", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}]};

const getPlayerRecords = (playerName) => axios.get(`http://ec2-3-22-20-210.us-east-2.compute.amazonaws.com/winrates/${playerName}`, {
	headers: {
	  'Access-Control-Allow-Origin': '*',
  }
});

const mockGetPlayerRecords = (playerName) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(MOCK_DATA);
  }, 300);
});

const COLUMNS = [
    {
      Header: 'Summoner',
      accessor: 'player',
    },
    {
      Header: 'Games Played',
      accessor: 'games',
      isSorted: true
    },
    {
      Header: 'Wins',
      accessor: 'wins',
    },
    {
      Header: 'Losses',
      accessor: 'losses',
    },
    {
      Header: 'Win Rate',
      accessor: 'winrate',
    }];

// const data = React.useMemo(() => makeData(2000), [])

function App() {
  const [inputValue, setInputValue] = useState('dashorde');
  const [player, setPlayer] = useState('dashorde');
  const [gameRecords, setGameRecords] = useState([]);
  const [error, setError] = useState();
  const [searching, setSearching] = useState(true);
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => gameRecords, [gameRecords])

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
    
    if (player !== inputValue) {
      setError();
      setSearching(true);
      setPlayer(inputValue);
    }
  };

  const updateGameRecords = (records) => {
    if (records) {
      const sortedRecords = records.sort((a, b) => b.gamesPlayed - a.gamesPlayed)
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
          <input autoFocus={true} value={inputValue} className="form__input" type="text" onChange={handleInputChange} />
          <button className="form__button" type="submit">Check Player</button>
        </form>
        {
          error && <p className="error">{error}</p>
        }
        {
          searching && <p>Searching...</p>
        }
        {
          !error && !searching && <PlayedWithTable columns={columns} data={data} />
        }
      </header>
    </div>
  );
}

export default App;
