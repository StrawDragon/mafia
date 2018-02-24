import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import * as Action from '../actions';
import { Fragment } from '../../common/components/fragment';
import { GameManagement } from '../game_management';
import { PlayerCard } from '../player_card';
import { RootState } from '../../common/reducer/root';
import Player from '../types/player';
import Shoot from '../types/shoot';
import PlayerRole from '../types/player_role';
import styles from './index.css';

interface Props {
  day: number;
  shoots: Shoot[];
  players: Player[];
  onNext: () => void;
  onToggleShoot: (shooter: Player, player: Player, day: number) => void;
}

class MafiaDoingDirtyBusinessComponent extends React.Component<Props> {
  render() {
    const { onNext, players, shoots, day, onToggleShoot } = this.props;
    const mafia = players.filter(player => player.role === PlayerRole.Don || player.role === PlayerRole.Mafia);
    return (
      <Fragment>
        <GameManagement
          title="Выстрелы мафии"
          nextDescription="Перейти к поиску доном шерифа"
          onNext={onNext}
        />
        <section className={styles.shootsTable}>
          <div className={styles.shootTableRow}>
            <div className={styles.shootTableCel}/>
            <div className={styles.shootTableCel}>
              <PlayerCard
                value={mafia[0]}
              />
            </div>
            <div className={styles.shootTableCel}>
              <PlayerCard
                value={mafia[1]}
              />
            </div>
            <div className={styles.shootTableCel}>
              <PlayerCard
                value={mafia[2]}
              />
            </div>
          </div>
          {players.map(player => (
            <div className={styles.shootTableRow} key={player.id}>
              <div className={styles.shootTableCel}>
                <PlayerCard
                  value={player}
                />
              </div>
              <div className={styles.shootTableCel}>
                <Button onClick={() => onToggleShoot(mafia[0], player, day)}>
                  {
                    shoots.find(shoot => shoot.fromPlayerID === mafia[0].id && shoot.toPlayerID === player.id)
                      ? '+'
                      : '-'
                  }
                </Button>
              </div>
              <div className={styles.shootTableCel}>
                <Button onClick={() => onToggleShoot(mafia[1], player, day)}>
                  {
                    shoots.find(shoot => shoot.fromPlayerID === mafia[1].id && shoot.toPlayerID === player.id)
                      ? '+'
                      : '-'
                  }
                </Button>
              </div>
              <div className={styles.shootTableCel}>
                <Button onClick={() => onToggleShoot(mafia[2], player, day)}>
                  {
                    shoots.find(shoot => shoot.fromPlayerID === mafia[2].id && shoot.toPlayerID === player.id)
                      ? '+'
                      : '-'
                  }
                </Button>
              </div>
            </div>
          ))}
        </section>
      </Fragment>
    );
  }
}

export const MafiaDoingDirtyBusiness = connect(
  (state: RootState) => {
    const { day, shoots, players } = state.gameCard;

    return {
      day,
      players,
      shoots: shoots.filter(shoot => shoot.dayNumber === day),
    };
  },
  dispatch => ({
    onNext: () => { dispatch(Action.requestNext()); },
    onToggleShoot: (shooter: Player, player: Player, day: number) => { dispatch(Action.toggleShoot(shooter, player, day)); },
  })
)(MafiaDoingDirtyBusinessComponent);
