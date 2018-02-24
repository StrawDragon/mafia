import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PlayerList } from '../player_list';
import { GameManagement } from '../game_management';
import { Fragment } from '../../common/components/fragment';
import Player from '../types/player';
import DonCheck from '../types/don_check';
import * as Actions from '../actions';
import { RootState } from '../../common/reducer/root';

interface Props {
  day: number;
  sheriffChecks: DonCheck[];
  onToggleSheriffCheck: (player: Player, day: number) => void;
  onNext: () => void;
}

class SheriffLookingDonComponent extends React.Component<Props> {

  renderCardContent = (player: Player) => {
    const { day, sheriffChecks, onToggleSheriffCheck } = this.props;
    
    return (
      <Button onClick={() => onToggleSheriffCheck(player, day)}>
        {
          sheriffChecks.find(sheriffCheck => sheriffCheck.dayNumber === day && sheriffCheck.toPlayerID === player.id)
            ? '+'
            : '-'
        }
      </Button>
    );
  }
  render() {

    return (
      <Fragment>
        <GameManagement
          title="Поиск шерифом дона"
          nextDescription="Перейти к следующему дню"
          onNext={this.props.onNext}
        />
        {/* Генерируем новый callback для перерисовки (грязно) */}
        <PlayerList
          cardContentRenderer={(player) => this.renderCardContent(player)}
        />
      </Fragment>
    );
  }
}

export const SheriffLookingDon = connect(
  (state: RootState) => ({
    day: state.gameCard.day,
    sheriffChecks: state.gameCard.sheriffChecks,
  }),
  dispatch => ({
    onNext: () => { dispatch(Actions.requestNext()); },
    onToggleSheriffCheck: (player: Player, day: number) => { dispatch(Actions.toggleSheriffCheck(player, day)); },
  }),
)(SheriffLookingDonComponent);
