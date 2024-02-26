import { removeSinglePlayer, winners } from '../db/db';
import { sendTurn } from '../responses/sendTurn';
import { DefinedAttackers } from '../types/core';
import { CellCoords, ShipType } from '../types/game';
import { findCurrentConnection } from '../utils/findCurrentConnection';
import { findPlayerById } from '../utils/findPlayer';
import { getCellStatus } from '../utils/getCellStatus';
import { checkIsGameEnd } from '../utils/checkIsGameEnd';
import { updateField } from '../utils/updateField';
import { updateWinners } from '../responses/updateWinners';
import { sendKillShipCellData } from './sendKillShipCellsData';
import { BOT_WS_ID } from '../constants/variables';
import { randomAttack } from '../responses/randomAttack';
import { checkIsItSimpleGame } from '../utils/checkIsItSimpleGame';
import { findCurrentGame } from '../utils/findCurrentGame';

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

  const isGameEnd = checkIsGameEnd(getAttackPlayer.field!);

  const type = isGameEnd ? 'finish' : 'attack';
  const data = isGameEnd
    ? {
        winPlayer: sendAttackPlayer.wsId,
      }
    : {
        position: {
          x,
          y,
        },
        currentPlayer: sendAttackPlayer.wsId,
        status: cellStatus,
      };

  const responseData = {
    type,
    data: JSON.stringify(data),
    id: 0,
  };

  const connection1 = findCurrentConnection(sendAttackPlayer.wsId);
  const connection2 = findCurrentConnection(getAttackPlayer.wsId);

  connection1.send(JSON.stringify(responseData));
  connection2.send(JSON.stringify(responseData));

  if (cellStatus === 'killed') {
    sendKillShipCellData(
      getAttackPlayer.field!,
      { x, y },
      shottingCell as ShipType,
      sendAttackPlayer.wsId,
      connection1,
      connection2
    );
  }

  if (isGameEnd) {
    const winner = winners.find(
      (winner) => winner.wsId === sendAttackPlayer.wsId
    );
    if (winner) {
      winner.wins += 1;
    } else {
      const winner = findPlayerById(sendAttackPlayer.wsId);
      winner.wins += 1;

      winners.push({ wsId: winner.wsId, name: winner.name, wins: winner.wins });
    }

    updateWinners();
    const isItSimpleGame = checkIsItSimpleGame(gameId);

    if (isItSimpleGame) {
      const currentGame = findCurrentGame(gameId);
      const simplePlayer =
        currentGame.player_1.wsId === BOT_WS_ID
          ? currentGame.player_2
          : currentGame.player_1;

      removeSinglePlayer(simplePlayer.wsId);
    }
  } else {
    if (cellStatus === 'killed' || cellStatus === 'shot') {
      sendTurn(gameId, sendAttackPlayer.wsId, connection1, connection2);

      if (sendAttackPlayer.wsId === BOT_WS_ID) {
        const attackData = {
          gameId,
          indexPlayer: BOT_WS_ID,
        };

        randomAttack(attackData);
      }
    } else {
      sendTurn(gameId, getAttackPlayer.wsId, connection1, connection2);

      if (sendAttackPlayer.wsId === BOT_WS_ID) {
        const attackData = {
          gameId,
          indexPlayer: BOT_WS_ID,
        };

        randomAttack(attackData);
      }
    }
  }
};
