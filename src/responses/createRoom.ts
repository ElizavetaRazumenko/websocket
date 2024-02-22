import { playerRooms } from '../db/db';
import { WebSocketWithId } from '../types/core';
import { findPlayerById } from '../utils/findPlayer';
import { getNumberId } from '../utils/getNumberId';

export const createRoom = (ws: WebSocketWithId) => {
  const roomId = getNumberId();
  const player = findPlayerById(ws.id);

  playerRooms.push({ roomId, playerNames: [player.name] });

  console.log('Create room:');
  console.log(playerRooms);
};
