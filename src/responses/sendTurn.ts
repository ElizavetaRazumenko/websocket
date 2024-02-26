import { BOT_WS_ID } from '../constants/variables';
import { WebSocketWithId } from '../types/core';
import { findCurrentGame } from '../utils/findCurrentGame';
import { findPlayerById } from '../utils/findPlayer';
import { randomAttack } from './randomAttack';

export const sendTurn = (
  gameId: number,
  walkingPlayerId: number,
  ...connections: WebSocketWithId[]
) => {
  const currentGame = findCurrentGame(gameId);

  if (currentGame.player_1.wsId === walkingPlayerId) {
    currentGame.player_1.turn = true;
    currentGame.player_2.turn = false;

    console.log(
      `Now is turn for ${findPlayerById(currentGame.player_1.wsId).name}`
    );
  } else {
    currentGame.player_1.turn = false;
    currentGame.player_2.turn = true;

    console.log(
      `Now is turn for ${findPlayerById(currentGame.player_2.wsId).name}`
    );
  }

  const responseData = {
    type: 'turn',
    data: JSON.stringify({
      currentPlayer: walkingPlayerId,
    }),
    id: 0,
  };

  connections.forEach((connection) =>
    connection.send(JSON.stringify(responseData))
  );

  // check if it game with bot
  const botWs = connections.find((connection) => connection.id === BOT_WS_ID);

  if (botWs) {
    const bot =
      currentGame.player_1.wsId === BOT_WS_ID
        ? currentGame.player_1
        : currentGame.player_2;

    if (bot.turn) {
      const attackData = {
        gameId,
        indexPlayer: BOT_WS_ID,
      };

      setTimeout(() => randomAttack(attackData), 1500);
    }
  }
};
