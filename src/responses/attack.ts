import { UserGameInfo } from '../types/core';
import { Attack } from '../types/game';
import { findCurrentConnection } from '../utils/findCurrentConnection';
import { findCurrentGame } from '../utils/findCurrentGame';
import { getCellStatus } from '../utils/getCellStatus';
import { isGameEnd } from '../utils/isGameEnd';
import { updateField } from '../utils/updateField';
import { sendTurn } from './sendTurn';

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

    const cellStatus = getCellStatus(shottingCell, getAttackPlayer.field!, {
      x,
      y,
    });

    updateField(cellStatus, getAttackPlayer.field!, { x, y });

    const connection1 = findCurrentConnection(sendAttackPlayer.wsId);
    const connection2 = findCurrentConnection(getAttackPlayer.wsId);

    let responseData;
    if (isGameEnd(getAttackPlayer.field!)) {
      console.log('Game over');
    } else {
      responseData = {
        type: 'attack',
        data: JSON.stringify({
          position: {
            x,
            y,
          },
          currentPlayer: sendAttackPlayer.wsId,
          status: cellStatus,
        }),
        id: 0,
      };
    }

    connection1.send(JSON.stringify(responseData));
    connection2.send(JSON.stringify(responseData));

    cellStatus === 'killed' || cellStatus === 'shot'
      ? sendTurn(sendAttackPlayer.wsId, connection1, connection2)
      : sendTurn(getAttackPlayer.wsId, connection1, connection2);
  }
};
