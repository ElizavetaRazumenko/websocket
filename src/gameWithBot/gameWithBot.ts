import { FrontRequest, WebSocketWithId } from '../types/core';
import { AddShips, Attack, RandomAttack } from '../types/game';
import { attack } from '../responses/attack';
import { randomAttack } from '../responses/randomAttack';
import { startSingleGame } from './startSingleGame';
import { startAttack } from './startAttack';

export const gameWithBot = (ws: WebSocketWithId, request: FrontRequest) => {
  switch (request.type) {
    case 'single_play':
      startSingleGame(ws);
      break;
    case 'add_ships':
      startAttack(ws, JSON.parse(request.data as string) as AddShips);
      break;
    case 'attack':
      attack(JSON.parse(request.data as string) as Attack);
      break;
    case 'randomAttack':
      randomAttack(JSON.parse(request.data as string) as RandomAttack);
      break;
  }
};
