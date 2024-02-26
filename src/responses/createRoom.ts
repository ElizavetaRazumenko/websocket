import { playerRooms } from '../db/db';
import { WebSocketWithId } from '../types/core';
import { findPlayerById } from '../utils/findPlayer';
import { getNumberId } from '../utils/getNumberId';

export const createRoom = (ws: WebSocketWithId): number => {
  const roomId = getNumberId();
  const player = findPlayerById(ws.id);

  playerRooms.push({ roomId, playerNames: [player.name] });

  console.log(`A room has been created with ID: ${roomId}`);
  return roomId;
};
