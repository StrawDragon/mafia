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
  donChecks: DonCheck[];
  onToggleDonCheck: (player: Player, day: number) => void;
  onNext: () => void;
}

class DonLookingSheriffComponent extends React.Component<Props> {

  renderCardContent = (player: Player) => {
    const { day, donChecks, onToggleDonCheck } = this.props;
    
    return (
      <Button onClick={() => onToggleDonCheck(player, day)}>
        {
          donChecks.find(donCheck => donCheck.dayNumber === day && donCheck.toPlayerID === player.id)
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
          title="Поиск доном шерифа"
          nextDescription="Перейти к поиску шерифом дона"
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

export const DonLookingSheriff = connect(
  (state: RootState) => ({
    day: state.gameCard.day,
    donChecks: state.gameCard.donChecks,
  }),
  dispatch => ({
    onNext: () => { dispatch(Actions.requestNext()); },
    onToggleDonCheck: (player: Player, day: number) => { dispatch(Actions.toggleDonCheck(player, day)); },
  }),
)(DonLookingSheriffComponent);
