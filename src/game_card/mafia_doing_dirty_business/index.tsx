import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import * as Action from '../actions';
import { Fragment } from '../../common/components/fragment';
import { GameManagement } from '../game_management';
import { PlayerList } from '../player_list';
import { RootState } from '../../common/reducer/root';
import Player from '../types/player';
import Shoot from '../types/shoot';
import PlayerRole from '../types/player_role';

interface Props {
  onNext: () => void;
  shooters: Player[];
  shoots: Shoot[];
  day: number;
}

interface State {
  isOpenedModal: boolean;
  shotPlayer: Player | undefined;
}

class MafiaDoingDirtyBusinessComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpenedModal: false,
      shotPlayer: undefined,
    };
  }

  openShooterChooserHandler = (player: Player) => {
    this.setState({
      isOpenedModal: true,
      shotPlayer: player,
    });
  }

  chooseShooterHandler = (shooter: Player) => {
    this.setState({
      isOpenedModal: false,
    });

    if (this.state.shotPlayer) {
      console.log(shooter, this.state.shotPlayer);
    }
  }

  renderCardContent = (player: Player) => {
    return (
      <div>
        <button onClick={() => this.openShooterChooserHandler(player)}>
          Выстрела нет
        </button>
      </div>
    );
  }
  
  render() {
    const { onNext, shooters } = this.props;

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
      >
        {shooters.map(shooter => (
          <Button onClick={() => this.chooseShooterHandler(shooter)} key={shooter.id}>
            {shooter.nickname}
          </Button>)
        )}
      </Modal>
      </Fragment>
    );
  }
}

export const MafiaDoingDirtyBusiness = connect(
  (state: RootState) => {
    const { day } = state.gameCard;

    return {
      day,
      shooters: state.gameCard.players.filter(player => player.role === PlayerRole.Mafia || player.role === PlayerRole.Don),
      shoots: state.gameCard.shoots.filter(shoot => shoot.dayNumber === day),
    };
  },
  dispatch => ({
    onNext: () => { dispatch(Action.requestNext()); }
  })
)(MafiaDoingDirtyBusinessComponent);
