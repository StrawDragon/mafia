import * as React from 'react';
import { connect } from 'react-redux';
import * as Action from '../actions';
import Shoot from '../types/shoot';
import { RootState } from '../../common/reducer/root';
import { PlayerList } from '../player_list';
import { NigthResult } from './nigth_result';
import { Fragment } from '../../common/components/fragment';
import { GameManagement } from '../game_management';

interface Props {
  stageTitle: string;
  nextDescription: string;
  currentShootingID: string;
  shoots: Array<Shoot>,
  onNext: () => void;
}

class CityAwekeningComponent extends React.Component<Props> {
  render() {
    const { onNext, stageTitle, nextDescription, currentShootingID, shoots } = this.props;
    return (<Fragment>
      <GameManagement
        title={stageTitle}
        nextDescription={nextDescription}
        onNext={onNext}
      />
      <NigthResult
        id={currentShootingID}
        shoots={shoots}
      />
      <PlayerList />
    </Fragment>);
  }
}

export const CityAwekening = connect(
  (state: RootState) => ({
    currentShootingID: state.gameCard.stage.currentShootingID,
    shoots: state.gameCard.shoots
  }),
  (dispatch) => ({
    onNext: () => { dispatch(Action.requestNext()) }
  })
)(CityAwekeningComponent);