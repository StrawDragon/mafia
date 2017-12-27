import * as React from 'react';
import { connect } from 'react-redux';
import Player from '../types/player';
import PlayerRole from '../types/player_role';
import { PlayerList } from '../player_list';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// tslint:disable-next-line
const eventToRadioRole = (e: React.ChangeEvent<HTMLInputElement>): PlayerRole => (e.target.value as any);

interface Props {
  onChangePlayerRole: (playerID: string, newPlayerType: PlayerRole) => void;
}

class CardDistributionComponent extends React.Component<Props> {
  roleChangeHandler = (role: PlayerRole, player: Player) => {
    const { onChangePlayerRole } = this.props;
    if (onChangePlayerRole) {
      if (player.role === role) {
        onChangePlayerRole(player.id, PlayerRole.Citizen);
      } else {
        onChangePlayerRole(player.id, role);
      }
    }
  }

  renderCardContent = (player: Player) => {
    return (
      <RadioGroup
        defaultValue={player.role}
        size="small"
        onChange={(e) => this.roleChangeHandler(eventToRadioRole(e), player)}
      >
        <RadioButton value={PlayerRole.Sheriff}>Шериф</RadioButton>
        <RadioButton value={PlayerRole.Mafia}>Мафия</RadioButton>
        <RadioButton value={PlayerRole.Don}>Дон</RadioButton>
      </RadioGroup>
    );
  }

  render() {
    return (
      <PlayerList
        cardContentRenderer={this.renderCardContent}
      />
    );
  }
}

export const CardDistribution = connect(
  () => ({}),
  (dispatch) => ({
    onChangePlayerRole: (playerID: string, newPlayerType: PlayerRole) => {},
  }),
)(CardDistributionComponent);
