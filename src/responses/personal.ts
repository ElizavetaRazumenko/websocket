import { players } from '../db/db';
import { isPlayerExist } from '../utils/isPlayerExist';
import { Player, WebSocketWithId } from '../db/types';

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

  const player = players.find((player) => player.name === name) as Player;
  player.wsId = ws.id;

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

  console.log('register player:');
  console.log(players);
};
