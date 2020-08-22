import React from 'react';
import './PlayedWithTable.scss';

const PlayedWithTable = ({ players }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Summoner</th>
                    <th>Games Played</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Win Rate</th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map(({ player, games, wins, losses, winrate }) => (
                        <tr key={player}>
                            <td>{player}</td>
                            <td className="align-right">{games}</td>
                            <td className="align-right">{wins}</td>
                            <td className="align-right">{losses}</td>
                            <td className="align-right">{winrate}%</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default PlayedWithTable;
