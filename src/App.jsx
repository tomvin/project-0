import React, { useState, useEffect } from 'react';
import PlayedWithTable from './components/PlayedWithTable/PlayedWithTable';
import { api } from './api/api';
import './App.scss';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import { SearchedPlayerOverview } from './components/SearchedPlayerOverview/SearchedPlayerOverview';
import LoadPlayerData from './components/LoadPlayerData/LoadPlayerData';

const SEARCH_STATES = {
  error: 'error',
  searching: 'searching',
  displayResults: 'displayResults',
  displayNothing: 'displayNothing'
};

const COLUMNS = [
  { Header: 'Summoner', accessor: 'player' },
  { Header: 'Games Played', accessor: 'games' },
  { Header: 'Wins', accessor: 'wins' },
  { Header: 'Losses', accessor: 'losses' },
  { Header: 'Win Rate', accessor: 'winrate' }
];

const filterPlayerFromRecords = (playerName, records) => {
  const recordsWithoutPlayer = records?.filter(r => r.player !== playerName);
  const playerRecord = records?.find(r => r.player === playerName);
  return {
    recordsWithoutPlayer,
    playerRecord
  };
}

const getSearchState = (error, searching, data) => {
  if (error) return SEARCH_STATES.error;
  if (searching) return SEARCH_STATES.searching;
  if (!error && !searching && data.length > 0) return SEARCH_STATES.displayResults;
  return SEARCH_STATES.displayNothing;
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [player, setPlayer] = useState();
  const [gameRecords, setGameRecords] = useState([]);
  const [playerRecord, setPlayerRecord] = useState({});
  const [error, setError] = useState();
  const [searching, setSearching] = useState(false);
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => gameRecords, [gameRecords])
  const searchState = React.useMemo(() => getSearchState(error, searching, data), [
    error, 
    searching, 
    data
  ]);

  const getPlayerRecords = (player) => {
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

      const { recordsWithoutPlayer, playerRecord } = filterPlayerFromRecords(player, data[player]);
      setGameRecords(recordsWithoutPlayer);
      setPlayerRecord(playerRecord);
      setSearching(false);
    }, (error) => {
      setError('No data found. Try loading this players games.');
      setSearching(false);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setPlayer(inputValue);
    getPlayerRecords(inputValue)
  };

  const handleLoadDataSuccess = () => getPlayerRecords(player);

  const handleInputChange = ({ target }) => setInputValue(target.value.toLowerCase());

  return (
    <div className="App">
      <header className="App-header">
        <h1>Project 0</h1>
        <form onSubmit={handleSubmit} className="form">
          <Input autoFocus={true} value={inputValue} className="form__input" type="text" onChange={handleInputChange} />
          <Button className="form__button" type="submit">Check Player</Button>
        </form>
      </header>
      <main className="main">
        { searchState === SEARCH_STATES.error && (
          <>
            <p className="error">{error}</p>
            <SearchedPlayerOverview onLoadSuccess={handleLoadDataSuccess} player={player} />
          </>
        )}
        { searchState === SEARCH_STATES.searching && <p className="searching">Searching...</p> }
        { searchState === SEARCH_STATES.displayResults && (
          <>
            <SearchedPlayerOverview onLoadSuccess={handleLoadDataSuccess} {...playerRecord} />
            <PlayedWithTable columns={columns} data={data} /> 
          </>
        )}
      </main>
    </div>
  );
}

export default App;
