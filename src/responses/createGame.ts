import { currentGames, playerRooms, removePlayerRoom, usersConnections } from '../db/db';
import { AddUserToRoom } from '../types/core';
import { findPlayerByName } from '../utils/findPlayer';
import { getNumberId } from '../utils/getNumberId';

export const createGame = ({ indexRoom }: AddUserToRoom) => {
  const room = playerRooms.find((room) => room.roomId === indexRoom);

  if (!room || room.playerNames.length !== 2) {
    return;
  }

  const idGame = getNumberId();

  const playingWsIds = room.playerNames.map((name) => {
    const player = findPlayerByName(name);
    return player.wsId;
  });

  usersConnections.forEach((connection) => {
    if (playingWsIds.includes(connection.id)) {
      const data = {
        idGame,
        idPlayer: connection.id,
      };
  
      const responseData = {
        type: 'create_game',
        data: JSON.stringify(data),
        id: 0,
      };
  
      connection.send(JSON.stringify(responseData));
    }
  });

  const game = {
    id: idGame,
    player_1: {
      wsId: playingWsIds[0],
      turn: false,
    },
    player_2: {
      wsId: playingWsIds[1],
      turn: false,
    },
  };

  currentGames.push(game);
  removePlayerRoom(room.roomId);

  console.log('currentGames is:');
  console.log(currentGames[0]);
};
