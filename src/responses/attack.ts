import { Attack } from '../types/game';
import { findCurrentGame } from '../utils/findCurrentGame';

export const attack = (attackData: Attack) => {
  const currentGame = findCurrentGame(attackData.gameId);
  const hittingPlayer =
    currentGame.player_1.wsId === attackData.indexPlayer
      ? currentGame.player_1
      : currentGame.player_2;
  console.log('currentGame');
  console.log(currentGame);
  console.log('hittingPlayer');
  console.log(hittingPlayer);
};
