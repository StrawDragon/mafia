import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import * as Action from '../actions';
import { Fragment } from '../../common/components/fragment';
import { GameManagement } from '../game_management';
import { PlayerList } from '../player_list';
import { RootState } from '../../common/reducer/root';
import Player from '../types/player';

interface Props {
  onNext: () => void;
}

interface State {
  isOpenedModal: boolean;
}

class MafiaDoingDirtyBusinessComponent extends React.Component<Props, State> {

  chooseShooterHandler = (player: Player) => {
    this.setState({
      isOpenedModal: true,
    });
  }

  renderCardContent = (player: Player) => {
    return (
      <div>
        <button onClick={() => this.chooseShooterHandler(player)}>
          Выстрела нет
        </button>
      </div>
    );
  }
  
  render() {
    const { onNext } = this.props;

    return (
      <Fragment>
        <GameManagement
          title="Выстрелы мафии"
          nextDescription="Перейти к поиску доном шерифа"
          onNext={onNext}
        />
        <PlayerList
          cardContentRenderer={this.renderCardContent}
        />
      <Modal
        visible={this.state.isOpenedModal}
      />
      </Fragment>
    );
  }
}

export const MafiaDoingDirtyBusiness = connect(
  (state: RootState) => ({}),
  dispatch => ({
    onNext: () => { dispatch(Action.requestNext()); }
  })
)(MafiaDoingDirtyBusinessComponent);
