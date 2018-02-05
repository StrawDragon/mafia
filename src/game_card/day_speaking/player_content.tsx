import * as React from 'react';
import { connect } from 'react-redux';
import * as Action from '../actions';
import getClassNames from '../../common/utils/get_class_names';
import { RootState } from '../../common/reducer/root';
import styles from './player_content.css';

export interface Props {
  onToggleSuspect: () => void;
  player: boolean;
}

export class PlayerContentComponent extends React.Component<Props> {
  render() {
    const { onToggleSuspect, value } = this.props;
    const classNames = getClassNames('player-content', styles, {
      'suspected': value,
    });

    return (
      <div className={classNames}>
        <button name="suspect-button" onClick={onToggleSuspect} >
          {!value ? 'Выставить на голосование' : 'Снять с голосования'}
        </button>
      </div>
    );
  }
}

export const PlayerContent = connect(
  (state: RootState) => {
    const { players, stage: { currentSpeakerID }, votings, day } = state.gameCard;

    const currentVotings = votings.filter(voting => voting.dayNumber === day);
    const currentSpeaker = players.find(player => player.id === currentSpeakerID);
    return {
      currentVotings,
      currentSpeaker,
    };
  },
  (dispatch) => ({
    onNext: () => { dispatch(Action.requestNext()); },
    onToggleSuspect: (initiatorID: string, playerID: string) => { dispatch(Action.toggleSuspect(initiatorID, playerID)); }
  }),
)(PlayerContentComponent);