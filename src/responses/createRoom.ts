import { playerRooms, players } from '../db/db';
import { WebSocketWithId } from '../db/types';
import { getNumberId } from '../utils/getNumberId';

export const createRoom = (ws: WebSocketWithId) => {
  const roomId = getNumberId();
  const playerName = players.find((player) => player.wsId === ws.id)!;

  playerRooms.push({ roomId, playerNames: [playerName.name] });

  console.log('Create room:');
  console.log(playerRooms);
};
