import WebSocket from 'ws';
import { roomPlayers } from '../db/db';

export const createRoom = (ws: WebSocket) => {
  console.log(roomPlayers.length);
};
