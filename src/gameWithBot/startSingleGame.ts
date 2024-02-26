import { botWs, singlePlayers } from '../db/db';
import { WebSocketWithId } from '../types/core';
import { findPlayerById } from '../utils/findPlayer';
import { addUserToRoom } from '../responses/addUserToRoom';
import { createGame } from '../responses/createGame';
import { createRoom } from '../responses/createRoom';
import { updateRoom } from '../responses/updateRoom';

export const startSingleGame = (ws: WebSocketWithId) => {
  const player = findPlayerById(ws.id);
  singlePlayers.push(player);

  const roomId = createRoom(ws);
  const dataForAddingUser = { indexRoom: roomId };
 
  addUserToRoom(botWs, dataForAddingUser);
  updateRoom();
  createGame(dataForAddingUser);
};
