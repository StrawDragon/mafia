import * as React from 'react';
import { connect } from 'react-redux';
import Player from '../types/player';
import { PlayerCard } from '../player_card';
import { RootState } from '../../common/reducer/root';
import { CardSize } from '../types/card_size';
import styles from './style.css';

interface Props {
  cardSize?: CardSize;
  players: Array<Player>;
  cardContentRenderer: (player: Player) => React.ReactNode;
}

class PlayerListComponent extends React.Component<Props> {
  renderPlayerCards(players: Array<Player>) {
    return players.map((player, index) => (
      <li className={styles.item} key={index}>
        <PlayerCard
            value={player}
            size={this.props.cardSize}
            disabled={player.dayDeathNumber !== undefined}
        >
          {this.props.cardContentRenderer(player)}
        </PlayerCard>
      </li>
    ));
  }

  render() {
    const { players } = this.props;

    return (
      <ul className={styles.list}>
        {this.renderPlayerCards(players)}
      </ul>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  players: state.gameCard.players
});

export const PlayerList = connect(
  mapStateToProps
)(PlayerListComponent);
