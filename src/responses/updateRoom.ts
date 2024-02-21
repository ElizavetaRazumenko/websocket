import { players, playerRooms, usersConnections } from '../db/db';

export const updateRoom = () => {
  const roomsWithOnePlayer = playerRooms.filter(
    (room) => room.playerNames.length === 1
  );

  let data;

  if (roomsWithOnePlayer.length) {
    data = roomsWithOnePlayer.map((room) => {
      const roomUsers = room.playerNames.map((name) => ({
        name,
        index: players.indexOf(players.find((player) => player.name === name)!),
      }));
      return {
        roomId: room.roomId,
        roomUsers,
      };
    });
  } else {
    data = {
      roomId: -1,
      roomUser: [],
    };
  }

  const responseData = {
    type: 'update_room',
    data: JSON.stringify(data),
    id: 0,
  };

  usersConnections.forEach((connection) => {
    connection.send(JSON.stringify(responseData));
  });
};
