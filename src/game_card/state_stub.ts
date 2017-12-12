import { GameCardState } from './reducer';
import PlayerRole from './types/player_role';
import VotingType from './types/voting_type';

const stub: GameCardState = {
  stage: 0,
  votes: [],
  votings: [
    {
      id: 'vi1',
      order: 0,
      type: VotingType.Normal,
      dayNumber: 0,
      playerID: 'pl1',
    }
  ],
  players: [
    {
      id: 'pl1',
      numberAtTable: 0,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl2',
      numberAtTable: 1,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl3',
      numberAtTable: 2,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl4',
      numberAtTable: 3,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl5',
      numberAtTable: 4,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 5,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl6',
      numberAtTable: 5,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl7',
      numberAtTable: 6,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl8',
      numberAtTable: 7,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl9',
      numberAtTable: 8,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl10',
      numberAtTable: 9,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
  ],
  sheriffChecks: [],
  shoots: [],
};

export default stub;
