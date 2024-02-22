import { currentGames } from '../db/db';
import { Game } from '../types/core';

export const findCurrentGame = (id: number):Game => currentGames.find(
  (game) => game.id === id
) as Game;