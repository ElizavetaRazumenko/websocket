import { currentGames } from '../db/db';
import { AddShips, Game, WebSocketWithId } from '../db/types';

export const addShips = (ws: WebSocketWithId, data: AddShips) => {
  const currentGame = currentGames.find(
    (game) => game.id === data.gameId
  ) as Game;

  if (currentGame.player_1.wsId === ws.id) {
    currentGame.player_1.field = [];
  } else if (currentGame.player_2.wsId === ws.id) {
    currentGame.player_2.field = [];
  }

  if (currentGame.player_1.field && currentGame.player_2.field) {
    console.log('Start current game:');
    console.log(currentGame);
    console.log(data);
  }
};
