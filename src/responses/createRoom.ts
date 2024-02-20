import { roomsWithOnePlayer } from '../db/db';
import { WebSocketWithId } from '../db/types';

export const createRoom = (ws: WebSocketWithId) => {
  roomsWithOnePlayer.push();
};
