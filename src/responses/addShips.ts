import { currentGames } from '../db/db';
import { Game, WebSocketWithId } from '../types/core';
import { AddShips, Ship } from '../types/gameProgress';
import { createGameField } from '../utils/createGameField';

export const addShips = (ws: WebSocketWithId, data: AddShips) => {
  const currentGame = currentGames.find(
    (game) => game.id === data.gameId
  ) as Game;

  const ships: Ship[] = data.ships;
  const field = createGameField(ships);
  console.log(field);

  // if (currentGame.player_1.wsId === ws.id) {
  //   currentGame.player_1.field = [];
  // } else if (currentGame.player_2.wsId === ws.id) {
  //   currentGame.player_2.field = [];
  // }

  // if (currentGame.player_1.field && currentGame.player_2.field) {
  //   console.log('Start current game:');
  //   console.log(currentGame);
  //   console.log(data);
  // }


};
