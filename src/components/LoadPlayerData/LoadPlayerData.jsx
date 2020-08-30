import React, { useState } from 'react';
import './LoadPlayerData.scss';
import { api } from '../../api/api';
import { getApiKey, setApiKey } from '../../api/local-storage';
import Button from '../Button/Button';
import Input from '../Input/Input';

const LoadPlayerData = ({ playerName, onLoadSuccess }) => {
  const [key, setKey] = useState(getApiKey());
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    const keyValue = target?.value;
    setKey(keyValue);
    setApiKey(keyValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    api.loadLatestGames(playerName, key).then(({data}) => {
      setLoading(false);
      if (!data) {
        alert('Failed to load data');
        return;
      }

      // alert('Success. Try searching again.');
      onLoadSuccess();
    }, (error) => {
      setLoading(false);
      alert('Failed to load data', error);
    });
  };

  return (
    <div className="load-player-data">
      <span className="info">Get latest game data for this player. Loading can take a while, check again in 30 minutes.</span>
      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="apikey">Riot API Key:</label>
        <Input id="apikey" type="text" value={key} onChange={handleInputChange}/>
        <Button className="load-player-data__button" type="submit">Load Player's Games</Button>
      </form>
    </div>
  )
};

export default LoadPlayerData;