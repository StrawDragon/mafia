import * as React from 'react';
import { connect } from 'react-redux';
import Player from '../types/player';
import PlayerRole from '../types/player_role';
import { PlayerList } from '../player_list';
import { Fragment } from '../../common/components/fragment';
import * as Action from '../actions';
import styles from './style.css';
import { GameManagement } from '../game_management';
import { RootState } from '../../common/reducer/root';
import { validateDistribution } from '../core/distribution';

const ROLE_TITLE = {
  [PlayerRole.Citizen]: 'Мирный',
  [PlayerRole.Sheriff]: 'Шериф',
  [PlayerRole.Mafia]: 'Мафия',
  [PlayerRole.Don]: 'Дон',
};

// tslint:disable no-any
const eventToRadioRole = (e: React.ChangeEvent<HTMLInputElement>): PlayerRole =>
  Number.parseInt(e.target.value as any);
// tslint:enable no-any

interface Props {
  players: Array<Player>;
  onChangePlayerRole: (playerID: string, newPlayerType: PlayerRole) => void;
  onNext: () => void;
}

class CardDistributionComponent extends React.Component<Props> {
  roleChangeHandler = (role: PlayerRole, player: Player) => {
    this.props.onChangePlayerRole(player.id, role);
  }

  renderCardContent = (player: Player) => {
    const handler = (e: React.ChangeEvent<HTMLInputElement>) =>
      this.roleChangeHandler(eventToRadioRole(e), player);

    return (
      <form className={styles.radio}>
        <label className={`${styles.label} ${styles.first}`}>М</label>
        <input
          className={`${styles.button} ${styles.first}`}
          type="radio"
          name={player.id}
          value={PlayerRole.Citizen}
          onChange={handler}
          defaultChecked={PlayerRole.Citizen === player.role}
        />
        <label className={`${styles.label} ${styles.second}`}>Ш</label>
        <input
          className={`${styles.button} ${styles.second}`}
          type="radio"
          name={player.id}
          value={PlayerRole.Sheriff}
          onChange={handler}
          defaultChecked={PlayerRole.Sheriff === player.role}
        />
        <label className={`${styles.label} ${styles.third}`}>М</label>
        <input
          className={`${styles.button} ${styles.third}`}
          type="radio"
          name={player.id}
          value={PlayerRole.Mafia}
          onChange={handler}
          defaultChecked={PlayerRole.Mafia === player.role}
        />
        <label className={`${styles.label} ${styles.fourth}`}>Д</label>
        <input
          className={`${styles.button} ${styles.fourth}`}
          type="radio"
          name={player.id}
          value={PlayerRole.Don}
          onChange={handler}
          defaultChecked={PlayerRole.Don === player.role}
        />
        <span className={styles.title}>{ROLE_TITLE[player.role]}</span>
      </form>
    );
  }

  render() {
    const { onNext, players } = this.props;
    const distributionValidation = validateDistribution(players);
    const nextDescription = distributionValidation.hasError
      ? 'Неправильно отмечена раздача'
      : 'Перейти к договору мафии';

    return (
      <Fragment>
        <GameManagement 
          title="Раздача ролей"
          nextDescription={nextDescription}
          onNext={onNext}
          disabled={distributionValidation.hasError}
        />
        <PlayerList
          cardContentRenderer={this.renderCardContent}
        />
      </Fragment>
    );
  }
}

export const CardDistribution = connect(
  (state: RootState) => ({
    players: state.gameCard.players,
  }),
  (dispatch) => ({
    onChangePlayerRole: (playerID: string, newPlayerType: PlayerRole) => {
      dispatch(Action.changePlayerRole(playerID, newPlayerType));
    },
    onNext: () => { dispatch(Action.requestNext()); },
  }),
)(CardDistributionComponent);
