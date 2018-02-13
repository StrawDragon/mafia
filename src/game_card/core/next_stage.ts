import StageType from '../types/stage_type';
import { GameCardState } from '../reducer';
import { getNextSpeaker } from './get_next_speaker';
import { getOpeningSpeaker } from './get_opening_speaker';

export const nextStage = {
  [StageType.CARD_DISTRIBUTION]: (state: GameCardState): GameCardState => ({
    ...state,
    stage: { ...state.stage, type: StageType.MAFIA_COLLUSION },
    currentTimerValue: 60,
    isRunTimer: false
  }),
  [StageType.MAFIA_COLLUSION]: (state: GameCardState): GameCardState => ({
    ...state,
    stage: { ...state.stage, type: StageType.DON_CITY_INSPECTION },
    currentTimerValue: 60,
    isRunTimer: false
  }),
  [StageType.DON_CITY_INSPECTION]: (state: GameCardState): GameCardState => ({
    ...state,
    stage: { ...state.stage, type: StageType.SHERIFS_CITY_INSPECTION },
    currentTimerValue: 60,
    isRunTimer: false
  }),
  [StageType.SHERIFS_CITY_INSPECTION]: (state: GameCardState): GameCardState => ({
    ...state,
    stage: { ...state.stage, type: StageType.CITY_AWAKENING },
    currentTimerValue: 60,
    isRunTimer: false
  }),
  [StageType.CITY_AWAKENING]: (state: GameCardState): GameCardState => {
    const openingSpeaker = getOpeningSpeaker(state.players, state.day, state.lastOpenedDaySpeakerID);
    return {
      ...state,
      lastOpenedDaySpeakerID: openingSpeaker.id,
      stage: {
        ...state.stage,
        type: state.stage.currentShootingID ? StageType.SHOT_DEAD_PLAYER_SPEAKING : StageType.DAY_SPEAKING,
        currentSpeakerID: openingSpeaker.id,
      },
      currentTimerValue: 60,
      isRunTimer: false
    };
  },
  [StageType.DAY_SPEAKING]: (state: GameCardState): GameCardState => {
    const { votings, day, players, lastOpenedDaySpeakerID, stage: { currentSpeakerID }} = state;
    const nextSpeaker = getNextSpeaker(players, day, lastOpenedDaySpeakerID, currentSpeakerID);
    const nextVoting = nextSpeaker ? undefined : votings.find(voting => voting.dayNumber === day);
    return {
      ...state,
      stage: {
        ...state.stage,
        type: nextSpeaker ? StageType.DAY_SPEAKING : StageType.VOTING,
        currentSpeakerID: nextSpeaker ? nextSpeaker.id : undefined,
        currentVotingID: nextVoting ? nextVoting.id : undefined,
      },
      currentTimerValue: 60,
      isRunTimer: false
    };
  },
  [StageType.VOTING]: (state: GameCardState): GameCardState => {
    const { votings, day, stage: { currentVotingID }, votes, players} = state;
    const todayVotings = votings.filter(voting => voting.dayNumber === day);
    const currentVotingIndex = todayVotings.findIndex(voting => voting.id === currentVotingID);
    const nextVoting = currentVotingIndex > -1 ? todayVotings[currentVotingIndex + 1] : undefined;
    // TODO: добавить автоматическое дополение голосами тех то не голосовал
    
    // если это было последнее голосование
    if (!nextVoting && currentVotingIndex > -1) {
      const todayVotes = votes.filter(vote =>
        todayVotings.find(voting => voting.id === vote.votingID)
      );
      
      const todayVotesMap = {};
      for (let i = 0; i < todayVotes.length; i++) {
        if (todayVotes[i].votingID in todayVotesMap) {
          todayVotesMap[todayVotes[i].votingID] = 0;
        }

        todayVotesMap[todayVotes[i].votingID] += 1;
      }

      const [, maxVoteCount] = Object.entries(todayVotesMap).reduce((acc, vote) => {
        if (acc[1] < vote[1]) {
          return vote;
        }

        return acc;
      });

      const suspectPlayers = Object.entries(todayVotesMap)
        .filter(([votingID, voteCount]) => voteCount === maxVoteCount)
        .map(([votingID, voteCount]) => {
          const targetVoting = todayVotings.find(voting => voting.id === votingID);
          return targetVoting ? targetVoting.playerID : undefined;
        })
        .filter(playerID => !!playerID);
      const newPlayers = players.map(player => {
        if (player.id === suspectPlayers[0]) {
          return {
            ...player,
            dayDeathNumber: day,
          };
        }

        return player;
      });

      return {
        ...state,
        players: newPlayers,
        stage: {
          ...state.stage,
          type: suspectPlayers.length === 1 ? StageType.OUTCAST_PLAYER_SPEAKING : StageType.AUTO_CRASH_VOTING,
          currentVotingID: nextVoting ? nextVoting.id : undefined,
        }
      };
    }

    return {
      ...state,
      stage: {
        ...state.stage,
        type: nextVoting ? StageType.VOTING : StageType.CITY_SLEEPING,
        currentVotingID: nextVoting ? nextVoting.id : undefined,
      }
    };
  },
};
