import { playerRooms, players } from '../db/db';
import { WebSocketWithId } from '../db/types';

export const createRoom = (ws: WebSocketWithId) => {
  const roomId = Math.ceil(Math.random()*1000);
  const playerName = players.find((player) => player.wsId === ws.id)!;

  playerRooms.push({ roomId, playerNames: [playerName.name] });

  console.log('Create room:');
  console.log(playerRooms);
};
