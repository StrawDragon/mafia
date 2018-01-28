import * as React from 'react';
import { connect } from 'react-redux';
import Player from '../types/player';
import { PlayerCard } from '../player_card';
import { RootState } from '../../common/reducer/root';
import { CardSize } from '../types/card_size';
import styles from './style.css';

export interface Props {
  players: Array<Player>;
  currentDay: number;
  cardSize?: CardSize;
  selectedPlayerNumber?: number;
  cardContentRenderer?: (player: Player) => React.ReactNode;
  disableDeathPlayers?: boolean;
}

export class PlayerListComponent extends React.Component<Props> {
  renderPlayerCards(players: Array<Player>) {
    return players.map((player, index) => {
      const { disableDeathPlayers, selectedPlayerNumber, currentDay, cardSize } = this.props;
      const { dayDeathNumber, numberAtTable } = player;

      const disabled = disableDeathPlayers || disableDeathPlayers === undefined
        ? dayDeathNumber !== undefined && dayDeathNumber <= currentDay
        : false;

      const selected = numberAtTable === selectedPlayerNumber;
      const size = cardSize || 'normal';

      return (
        <li className={styles.item} key={index}>
          <PlayerCard
            value={player}
            size={size}
            disabled={disabled}
            selected={selected}
          >
            {this.props.cardContentRenderer ?
              this.props.cardContentRenderer(player) :
              null
            }
          </PlayerCard>
        </li>
      );
    });
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
  players: state.gameCard.players,
  currentDay: state.gameCard.day,
});

export const PlayerList = connect(
  mapStateToProps
)(PlayerListComponent);
