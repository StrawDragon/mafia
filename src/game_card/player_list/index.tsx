import * as React from 'react';
import { connect } from 'react-redux';
import Player from '../types/player';
import PlayerCard from '../player_card';
import { RootState } from '../../common/reducer/root';

import * as styles from './style.css';

interface Props {
  players: Array<Player>;
}

class PlayerList extends React.Component<Props> {
  renderPlayerCards(players: Array<Player>) {
    return players.map((player, index) => (
        <PlayerCard
            key={index}
            value={player}
            number={index + 1}
        />
    ));
  }

  render() {
    const { players } = this.props;

    return (
      <div>
        <h3>
          Список игроков
        </h3>
        <div className={styles.list}>
          {this.renderPlayerCards(players)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  players: state.gameCard.players
});

export default connect(
  mapStateToProps
)(PlayerList);
