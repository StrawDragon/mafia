import * as React from 'react';
import Timer from './timer';

class GameCard extends React.Component {
  render() {
    return (
      <div className="align-center">
        <Timer />
      </div>
    );
  }
}

export default GameCard;
