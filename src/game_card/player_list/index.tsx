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
  disable?: boolean;
  cardSize?: CardSize;
  selectedPlayerNumber?: number;
  cardContentRenderer?: (player: Player) => React.ReactNode;
  disableDeathPlayers?: boolean;
}

const isDisabledPlayer = (props: Props, dayDeathNumber?: number) => {
  const { disable, disableDeathPlayers = true, currentDay } = props;

  if (disable) { return true; }

  const isDeathPlayer = dayDeathNumber !== undefined && dayDeathNumber <= currentDay;

  return disableDeathPlayers ? isDeathPlayer : false;
};

export class PlayerListComponent extends React.Component<Props> {
  renderPlayerCards(players: Array<Player>) {
    return players.map((player, index) => {
      const { selectedPlayerNumber, cardSize, cardContentRenderer } = this.props;
      const { dayDeathNumber, numberAtTable } = player;

      const cardContent = cardContentRenderer ? cardContentRenderer(player) : null;
      const disabled = isDisabledPlayer(this.props, dayDeathNumber);
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
            {cardContent}
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
