import { FrontRequest, IdentificationalWebSocket, PlayerReg } from '../db/types';
import { regPlayer } from '../responses/personal';

export const handleWsRequest = (ws: IdentificationalWebSocket, request: FrontRequest) => {
  switch (request.type) {
    case 'reg':
      regPlayer(ws, request.data as PlayerReg);
      break;
  }
};
