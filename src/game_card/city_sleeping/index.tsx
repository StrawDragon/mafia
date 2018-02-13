import * as React from 'react';
import { connect } from 'react-redux';
import { GameManagement } from '../game_management';
import * as Actions from '../actions';

interface Props {
  onNext: () => void;
}

export class CitySleepingComponent extends React.Component<Props> {
  render() {
    const { onNext } = this.props;

    return (
      <GameManagement
        title={'Город засыпает'}
        nextDescription={'Перейти к грязному делу мафии'}
        onNext={onNext}
      />
    );
  }
}

export const CitySleeping = connect(
  state => ({}),
  dispatch => ({
    onNext: () => { dispatch(Actions.requestNext()); },
  })
)(CitySleepingComponent);
