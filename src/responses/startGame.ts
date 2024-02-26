import { UserGameInfo, WebSocketWithId } from '../types/core';
import { AddShips, PlayersShipsInfo, Ship } from '../types/game';
import { createGameField } from '../utils/createGameField';
import { findCurrentConnection } from '../utils/findCurrentConnection';
import { findCurrentGame } from '../utils/findCurrentGame';
import { sendTurn } from './sendTurn';

const sendStartGameRequest = (
  ws: WebSocketWithId,
  playerInfo: UserGameInfo,
  playerShips: Ship[]
) => {
  const responseData = {
    type: 'start_game',
    data: JSON.stringify({
      ships: playerShips,
      currentPlayerIndex: playerInfo.wsId,
    }),
    id: 0,
  };

  ws.send(JSON.stringify(responseData));
};

export const startGame = (ws: WebSocketWithId, data: AddShips) => {
  const playersShipsInfo: PlayersShipsInfo = {};
  const currentGame = findCurrentGame(data.gameId);

  const ships: Ship[] = data.ships;
  const field = createGameField(ships);

  const { player_1, player_2 } = currentGame;

  if (player_1.wsId === ws.id) {
    player_1.field = field;
    playersShipsInfo.player_1 = ships;
  } else {
    player_2.field = field;
    playersShipsInfo.player_2 = ships;
  }

  // Going to the block below means that the current connection is the second one
  // Accordingly, the player with an ID different from this connection ID
  // will go first
  if (player_1.field && player_2.field) {
    if (player_1.wsId !== ws.id) {
      const connection_1 = findCurrentConnection(player_1.wsId);
      sendStartGameRequest(connection_1, player_1, playersShipsInfo.player_1!);

      const connection_2 = ws;
      sendStartGameRequest(connection_2, player_2, playersShipsInfo.player_2!);

      sendTurn(data.gameId, player_2.wsId, connection_1, connection_2);
    } else {
      const connection_1 = ws;
      sendStartGameRequest(connection_1, player_1, playersShipsInfo.player_1!);

      const connection_2 = findCurrentConnection(player_2.wsId);
      sendStartGameRequest(connection_2, player_2, playersShipsInfo.player_2!);

      sendTurn(data.gameId, player_1.wsId, connection_1, connection_2);
    }
  }

  console.log('The following game has been started:');
  console.log(currentGame);
};
