import { BOT_WS_ID } from '../constants/variables';
import { randomAttack } from '../responses/randomAttack';
import { startGame } from '../responses/startGame';
import { WebSocketWithId } from '../types/core';
import { AddShips } from '../types/game';
import { findCurrentGame } from '../utils/findCurrentGame';
import { generateRandomField } from '../utils/generateRandomField';

export const startAttack = (ws: WebSocketWithId, data: AddShips) => {
  const game = findCurrentGame(data.gameId);

  const botField = generateRandomField();
  game.player_1.wsId === BOT_WS_ID
    ? (game.player_1.field = botField)
    : (game.player_2.field = botField);

  // register user data
  startGame(ws, data);

  const attackData = {
    gameId: data.gameId,
    indexPlayer: BOT_WS_ID,
  };

  randomAttack(attackData);
};
