import * as React from 'react';
import Player from '../types/player';
import PlayerRole from '../types/player_role';
import { PlayerList } from '../player_list';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// tslint:disable-next-line
const eventToRadioRole = (e: React.ChangeEvent<HTMLInputElement>): PlayerRole => (e.target.value as any);

interface Props {
  onChangePlayer: (player: Player) => void;
}

export class CardDistribution extends React.Component<Props> {
  roleChangeHandler = (role: PlayerRole, player: Player) => {
    const { onChangePlayer } = this.props;
    if (onChangePlayer) {
      if (player.role === role) {
        onChangePlayer({...player, role: PlayerRole.Citizen});
      } else {
        onChangePlayer({...player, role});
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