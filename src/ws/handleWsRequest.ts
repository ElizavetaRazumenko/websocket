import WebSocket from 'ws';
import { FrontRequest, PlayerReg } from '../db/types';
import { regPlayer } from '../responses/personal';

export const handleWsRequest = (ws: WebSocket, request: FrontRequest) => {
  switch (request.type) {
    case 'reg':
      regPlayer(ws, request.data as PlayerReg);
      break;
  }
};
