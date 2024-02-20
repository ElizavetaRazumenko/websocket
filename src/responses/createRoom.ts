import crypto from 'crypto';
import { playerRooms, players } from '../db/db';
import { WebSocketWithId } from '../db/types';

export const createRoom = (ws: WebSocketWithId) => {
  const roomId = crypto.randomBytes(16).toString('hex');
  const playerName = players.find((player) => player.wsId === ws.id)!;

  playerRooms.push({ roomId, playerNames: [ playerName.name ]});
};
