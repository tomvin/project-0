import React, { useState, useEffect } from 'react';
import PlayedWithTable from './components/PlayedWithTable/PlayedWithTable';
import { api } from './api/api';
import './App.scss';

const COLUMNS = [
  { Header: 'Summoner', accessor: 'player' },
  { Header: 'Games Played', accessor: 'games' },
  { Header: 'Wins', accessor: 'wins' },
  { Header: 'Losses', accessor: 'losses' },
  { Header: 'Win Rate', accessor: 'winrate' }
];

function App() {
  const [inputValue, setInputValue] = useState('');
  const [player, setPlayer] = useState();
  const [gameRecords, setGameRecords] = useState([]);
  const [error, setError] = useState();
  const [searching, setSearching] = useState(false);
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => gameRecords, [gameRecords])

  useEffect(() => {
    if (!player || player === '') return;
    setError();
    setSearching(true);
    setGameRecords([]);

    api.getPlayerRecords(player).then(({data}) => {
      if (!data || !data[player]) {
        setError('Player not found.');
        setSearching(false);
        return;
      }

      setGameRecords(data[player]);
      setSearching(false);
    }, (error) => {
      setError('Server error.');
      setSearching(false);
    })
  }, [player]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (player !== inputValue) {
      setPlayer(inputValue);
    }
  };

  const handleInputChange = ({ target }) => setInputValue(target.value.toLowerCase());

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
          !error && !searching && data.length > 0 && <PlayedWithTable columns={columns} data={data} />
        }
      </header>
    </div>
  );
}

export default App;
