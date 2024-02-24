import { WebSocketWithId } from '../types/core';
import { findCurrentGame } from '../utils/findCurrentGame';

export const sendTurn = (
  gameId: number,
  walkingPlayerId: number,
  ...connections: WebSocketWithId[]
) => {
  const currentGame = findCurrentGame(gameId);

  currentGame.player_1.wsId === walkingPlayerId
    ? (function () {
        currentGame.player_1.turn = true;
        currentGame.player_2.turn = false;
      })()
    : (function () {
        currentGame.player_1.turn = false;
        currentGame.player_2.turn = true;
      })();

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
};
