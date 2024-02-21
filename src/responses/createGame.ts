import { playerRooms, usersConnections } from '../db/db';
import { AddUserToRoom, WebSocketWithId } from '../db/types';
import { getNumberId } from '../utils/getNumberId';

export const createGame = (
  ws: WebSocketWithId,
  { indexRoom }: AddUserToRoom
) => {
  const room = playerRooms.find((room) => room.roomId === indexRoom);

  if (!room || room.playerNames.length !== 2) {
    return;
  }

  const idGame = getNumberId();

  usersConnections.forEach((connection) => {
    const data = {
      idGame,  
      idPlayer: connection.id,
    };

    const responseData = {
      type: 'create_game',
      data: JSON.stringify(data),
      id: 0,
    };

// add functionality of adding the game in BD

    connection.send(JSON.stringify(responseData));
  });
};
