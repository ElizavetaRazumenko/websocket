import { players } from '../db/db';
import { isPlayerExist } from '../utils/isPlayerExist';
import { WebSocketWithId } from '../types/core';
import { findPlayerByName } from '../utils/findPlayer';

type UserData = {
  name: string;
  password: string;
};

export const regPlayer = (
  ws: WebSocketWithId,
  { name, password }: UserData
) => {
  if (!isPlayerExist(name)) {
    players.push({ wsId: ws.id, name, password, wins: 0 });
  }

  const player = findPlayerByName(name);
  player.wsId = ws.id;

  let data;

  if (player.password !== password) {
    data = {
      name,
      index: player.wsId,
      error: true,
      errorText: 'Invalid password',
    };
    console.log(`A user named ${data.name} entered an invalid password`);
  } else {
    data = {
      name,
      index: player.wsId,
      error: false,
      errorText: '',
    };

    console.log('The following user is logged in:');
    console.log(data.name);
  }

  const responseData = {
    type: 'reg',
    data: JSON.stringify(data),
    id: 0,
  };

  ws.send(JSON.stringify(responseData));
};
