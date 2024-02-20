import WebSocket from 'ws';
import { winners } from '../db/db';

export const updateWinners = (ws: WebSocket) => {
  const responseData = {
    type: 'update_winners',
    data: JSON.stringify(winners),
    id: 0,
  };

  ws.send(JSON.stringify(responseData));
};
