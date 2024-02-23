import { playerRooms, players } from '../db/db';
import { AddUserToRoom, WebSocketWithId } from '../types/core';
import { findPlayerById } from '../utils/findPlayer';

export const addUserToRoom = (
  ws: WebSocketWithId,
  { indexRoom }: AddUserToRoom
) => {
  const room = playerRooms.find((room) => room.roomId === indexRoom);

  if (!room || room.playerNames.length > 1) {
    return;
  }

  const player = players.find((player) =>
    room.playerNames.includes(player.name)
  );

  if (player?.wsId === ws.id) {
    return;
  }

  const newPlayer = findPlayerById(ws.id);
  room.playerNames.push(newPlayer.name);

  console.log('Add user to room. All rooms:');
  console.log(playerRooms);
};
