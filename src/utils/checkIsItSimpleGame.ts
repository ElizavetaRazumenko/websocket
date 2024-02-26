import { findCurrentGame } from './findCurrentGame';

export const checkIsItSimpleGame = (gameId: number) => {
  const currentGame = findCurrentGame(gameId);
  return currentGame.player_1.wsId === -1 || currentGame.player_2.wsId === -1;
};