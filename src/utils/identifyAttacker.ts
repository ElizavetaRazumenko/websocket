import { DefinedAttackers, Game, UserGameInfo } from '../types/core';

export const identiFyAttacker = (game: Game, indexPlayer: number): DefinedAttackers => {
  let sendAttackPlayer: UserGameInfo;
  let getAttackPlayer: UserGameInfo;

  game.player_1.wsId === indexPlayer
  ? (function () {
      sendAttackPlayer = game.player_1;
      getAttackPlayer = game.player_2;
    })()
  : (function () {
      sendAttackPlayer = game.player_2;
      getAttackPlayer = game.player_1;
    })();

    return { sendAttackPlayer, getAttackPlayer };
};