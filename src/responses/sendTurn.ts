import { WebSocketWithId } from '../types/core';

export const sendTurn = (
  walkingPlayerId: number,
  ...connections: WebSocketWithId[]
) => {
  const responseData = {
    type: 'turn',
    data: JSON.stringify({
      currentPlayer: walkingPlayerId,
    }),
    id: 0,
  };

  connections.forEach((connection) => connection.send(JSON.stringify(responseData)));
};
