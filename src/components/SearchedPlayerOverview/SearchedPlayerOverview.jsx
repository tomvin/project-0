import React from 'react';
import './SearchedPlayerOverview.scss';
import LoadPlayerData from '../LoadPlayerData/LoadPlayerData';

export const SearchedPlayerOverview = ({
  games,
  losses,
  player,
  winrate,
  wins,
  onLoadSuccess
}) => {

  return (
    <div className="searched-player-overview-wrapper">
      <div className="searched-player-overview">
        <h2 className="searched-player-overview__name">{player}</h2>
        <div>Win Rate: {winrate || '?'}%</div>
        <div>Wins: {wins || '?'}</div>
        <div>losses: {losses || '?'}</div>
        <div>Games Played: {games || '?'}</div>
      </div>
      <LoadPlayerData onLoadSuccess={onLoadSuccess} playerName={player} />
    </div>
  )
};
