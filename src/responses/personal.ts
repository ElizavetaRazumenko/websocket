import WebSocket from 'ws';
import { players } from '../db/db';
import { isPlayerExist } from '../utils/isPlayerExist';
import { Player } from '../db/types';

type UserData = {
  name: string;
  password: string;
};

export const regPlayer = (ws: WebSocket, { name, password }: UserData) => {
  if (!isPlayerExist(name)) {
    players.push({ name, password, wins: 0 });
  }

  const player = players.find((player) => player.name === name) as Player;

  let data;

  if (player.password !== password) {
    data = {
      name,
      index: players.indexOf(player),
      error: true,
      errorText: 'Invalid password',
    };
  } else {
    data = {
      name,
      index: players.indexOf(player),
      error: false,
      errorText: '',
    };
  }

  const responseData = {
    type: 'reg',
    data: JSON.stringify(data),
    id: 0,
  };

  ws.send(JSON.stringify(responseData));
};
