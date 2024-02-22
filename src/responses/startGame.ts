import { UserGameInfo, WebSocketWithId } from '../types/core';
import { AddShips, Ship } from '../types/game';
import { createGameField } from '../utils/createGameField';
import { findCurrentConnection } from '../utils/findCurrentConnection';
import { findCurrentGame } from '../utils/findCurrentGame';
import { sendTurn } from './sendTurn';

const sendStartGameRequest = (
  ws: WebSocketWithId,
  playerInfo: UserGameInfo
) => {
  const responseData = {
    type: 'start_game',
    data: JSON.stringify({
      ships: playerInfo.shipsData,
      currentPlayerIndex: playerInfo.wsId,
    }),
    id: 0,
  };

  ws.send(JSON.stringify(responseData));
};

export const startGame = (ws: WebSocketWithId, data: AddShips) => {
  const currentGame = findCurrentGame(data.gameId);

  const ships: Ship[] = data.ships;
  const field = createGameField(ships);

  if (currentGame.player_1.wsId === ws.id) {
    currentGame.player_1.field = field;
    currentGame.player_1.shipsData = ships;
  } else if (currentGame.player_2.wsId === ws.id) {
    currentGame.player_2.field = field;
    currentGame.player_2.shipsData = ships;
  }

  // Going to the block below means that the current connection is the second one
  // Accordingly, the player with an ID different from this connection ID
  // will go first
  if (currentGame.player_1.field && currentGame.player_2.field) {
    if (currentGame.player_1.wsId !== ws.id) {
      currentGame.player_1.turn = true;
      const connection_1 = findCurrentConnection(currentGame.player_1.wsId);
      sendStartGameRequest(connection_1, currentGame.player_1);

      const connection_2 = ws;
      sendStartGameRequest(connection_2, currentGame.player_2);

      sendTurn(currentGame.player_1.wsId, connection_1, connection_2);
    } else {
      const connection_1 = ws;
      sendStartGameRequest(connection_1, currentGame.player_1);

      currentGame.player_2.turn = true;
      const connection_2 = findCurrentConnection(currentGame.player_2.wsId);
      sendStartGameRequest(connection_2, currentGame.player_2);

      sendTurn(currentGame.player_2.wsId, connection_1, connection_2);
    }
  }
};
