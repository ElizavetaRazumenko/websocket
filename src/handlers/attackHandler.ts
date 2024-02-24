import { sendTurn } from '../responses/sendTurn';
import { DefinedAttackers } from '../types/core';
import { CellCoords } from '../types/game';
import { findCurrentConnection } from '../utils/findCurrentConnection';
import { getCellStatus } from '../utils/getCellStatus';
import { isGameEnd } from '../utils/isGameEnd';
import { updateField } from '../utils/updateField';

type Params = {
  gameId: number;
  coords: CellCoords;
  players: DefinedAttackers;
};

export const attackHandler = ({ gameId, coords, players }: Params) => {
  const { x, y } = coords;
  const { sendAttackPlayer, getAttackPlayer } = players;

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

    responseData = {
      type: 'finish',
      data: JSON.stringify({
        winPlayer: sendAttackPlayer.wsId, // CHANGE LATER!!!!!!!!!!
      }),
      id: 0,
    };
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

  // REMOVE FROM FINISH
  cellStatus === 'killed' || cellStatus === 'shot'
    ? sendTurn(gameId, sendAttackPlayer.wsId, connection1, connection2)
    : sendTurn(gameId, getAttackPlayer.wsId, connection1, connection2);
};
