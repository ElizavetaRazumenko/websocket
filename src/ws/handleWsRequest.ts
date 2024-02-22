import {
  AddUserToRoom,
  FrontRequest,
  PlayerReg,
  WebSocketWithId,
} from '../types/core';
import { AddShips } from '../types/game';
import { startGame } from '../responses/startGame';
import { addUserToRoom } from '../responses/addUserToRoom';
import { createGame } from '../responses/createGame';
import { createRoom } from '../responses/createRoom';
import { regPlayer } from '../responses/regPlayer';
import { updateRoom } from '../responses/updateRoom';
import { updateWinners } from '../responses/updateWinners';

export const handleWsRequest = (ws: WebSocketWithId, request: FrontRequest) => {
  switch (request.type) {
    case 'reg':
      regPlayer(ws, JSON.parse(request.data as string) as PlayerReg);
      updateRoom();
      updateWinners();
      break;
    case 'create_room':
      createRoom(ws);
      updateRoom();
      break;
    case 'add_user_to_room':
      addUserToRoom(ws, JSON.parse(request.data as string) as AddUserToRoom);
      updateRoom();
      createGame(JSON.parse(request.data as string) as AddUserToRoom);
      break;
    case 'add_ships':
      startGame(ws, JSON.parse(request.data as string) as AddShips);
      break;
  }
};
