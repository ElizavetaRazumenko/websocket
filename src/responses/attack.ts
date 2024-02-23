import { UserGameInfo } from '../types/core';
import { Attack } from '../types/game';
import { findCurrentConnection } from '../utils/findCurrentConnection';
import { findCurrentGame } from '../utils/findCurrentGame';

export const attack = (attackData: Attack) => {
  const currentGame = findCurrentGame(attackData.gameId);
  let sendAttackPlayer: UserGameInfo;
  let getAttackPlayer: UserGameInfo;

  currentGame.player_1.wsId === attackData.indexPlayer
    ? (function () {
        sendAttackPlayer = currentGame.player_1;
        getAttackPlayer = currentGame.player_2;
      })()
    : (function () {
        sendAttackPlayer = currentGame.player_2;
        getAttackPlayer = currentGame.player_1;
      })();

  if (sendAttackPlayer.turn) {
    const { x, y } = attackData;
    const shottingCell = getAttackPlayer.field![y][x];
    console.log(shottingCell);
    const connection1 = findCurrentConnection(sendAttackPlayer.wsId);
    const connection2 = findCurrentConnection(getAttackPlayer.wsId);

    const responseData = {
      type: 'attack',
      data: JSON.stringify({
        position: {
          x,
          y,
        },
        currentPlayer: sendAttackPlayer.wsId,
        status: 'shot',
      }),
      id: 0,
    };

    connection1.send(JSON.stringify(responseData));
    connection2.send(JSON.stringify(responseData));
  }
};
