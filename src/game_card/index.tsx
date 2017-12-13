import * as React from 'react';
import PlayerList from './player_list';
import VotingComponent from './voting';

class GameCard extends React.Component {
  render() {
    return (
      <div className="align-center">
        <h1>Карточка игры</h1>
        <PlayerList />
        <VotingComponent />
      </div>
    );
  }
}

export default GameCard;
