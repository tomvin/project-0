import React from 'react';
import './PlayedWithTable.scss';

const PlayedWithTable = ({ players }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Summoner</th>
                    <th>Games</th>
                    <th>Games Played</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Win Rate</th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map(({ player, games, wins, losses, winRate }) => (
                        <tr key={player}>
                            <td>{player}</td>
                            <td>{games}</td>
                            <td>{wins}</td>
                            <td>{losses}</td>
                            <td>{winRate}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default PlayedWithTable;
