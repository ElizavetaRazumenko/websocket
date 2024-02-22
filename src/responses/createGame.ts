import { currentGames, playerRooms, players, usersConnections } from '../db/db';
import { AddUserToRoom, Player } from '../types/core';
import { getNumberId } from '../utils/getNumberId';

export const createGame = ({ indexRoom }: AddUserToRoom) => {
  const room = playerRooms.find((room) => room.roomId === indexRoom);

  if (!room || room.playerNames.length !== 2) {
    return;
  }

  const idGame = getNumberId();

  const playingWsIds = room.playerNames.map((name) => {
    const player = players.find((player) => player.name === name) as Player;
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
      turn: true,
    },
    player_2: {
      wsId: playingWsIds[1],
      turn: false,
    },
  };

  currentGames.push(game);

  console.log('currentGames is:');
  console.log(currentGames[0]);
};
