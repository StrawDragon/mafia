import { GameCardState } from './reducer';
import PlayerRole from './types/player_role';
import VotingType from './types/voting_type';

const stub: GameCardState = {
  stage: 2,

  votes: [
    {
      id: 'v1',
      votingID: 'vi0',
      playerID: 'pl0',
    },
    {
      id: 'v1',
      votingID: 'vi3',
      playerID: 'pl0',
    },
  ],
  votings: [
    {
      id: 'vi0',
      order: 0,
      dayNumber: 0,
      playerID: 'pl1',
    },
    {
      id: 'vi1',
      order: 1,
      dayNumber: 0,
      playerID: 'pl2',
    },
    {
      id: 'vi3',
      order: 2,
      dayNumber: 1,
      playerID: 'pl5',
    },
    {
      id: 'vi4',
      order: 3,
      dayNumber: 1,
      playerID: 'pl9',
    },
  ],
  carCrashes: [],
  airCrashes: [],
  players: [
    {
      id: 'pl0',
      numberAtTable: 0,
      nickname: 'Корлеоне',
      avatar: 'https://pp.userapi.com/c10133/g32986998/e_aabbbcf8.jpg',
      warningCount: 1,
      role: PlayerRole.Don,
    },
    {
      id: 'pl1',
      numberAtTable: 1,
      nickname: 'Линкольн',
      avatar: 'https://pp.userapi.com/c626129/v626129035/62b24/NtCTq2___30.jpg',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl2',
      numberAtTable: 2,
      nickname: 'Пикачу',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMeErUy9dEmlVNmN3L8qApzbZZjJ7ZJEeZVdL5LIEJNm_v4cRH',
      deathDayNumber: 2,
      warningCount: 4,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl3',
      numberAtTable: 3,
      nickname: 'Джокер',
      avatar: 'https://images.stopgame.ru/uploads/avatars/c64x64/cPWIqei9T4-17K5J-UMpnQ/avatar_284274.jpg',
      deathDayNumber: 1,
      warningCount: 0,
      role: PlayerRole.Mafia,
    },
    {
      id: 'pl4',
      numberAtTable: 4,
      nickname: 'Царь',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhmC9v77KJFkkkh6e4c9VWMVA_ocumZJ_HEFqMwvGFb8mP_A-j',
      deathDayNumber: undefined,
      warningCount: 5,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl5',
      numberAtTable: 5,
      nickname: 'Том',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShzuWp1XTLo1wGiGzOvfV_TXjNZxqBORYia7y0RoHT6bzas2bD',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Mafia,
    },
    {
      id: 'pl6',
      numberAtTable: 6,
      nickname: 'Дракон',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH4XLtPAC_GKrPBS6YzcaYZ-qaPbFT7DZ1XKpIXyKL7zdo4VPZ',
      deathDayNumber: undefined,
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl7',
      numberAtTable: 7,
      nickname: 'Мистр Огурчик',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMIGQ5Yc-aLcBWYVVrooL6I_QyublVOU67ac530HSIY6gpErgF',
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl8',
      numberAtTable: 8,
      nickname: 'Бегемот',
      avatar: 'http://ic.pics.livejournal.com/globolife/59791984/424722/424722_original.jpg',
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
    {
      id: 'pl9',
      numberAtTable: 9,
      nickname: 'Помидор',
      avatar: 'https://proshkolu.ru/content/media/pic/std/2000000/1352000/1351454-e69254abddc83801.gif',
      warningCount: 0,
      role: PlayerRole.Citizen,
    },
  ],
  sheriffChecks: [],
  donChecks: [],
  shoots: [],
};

export default stub;
