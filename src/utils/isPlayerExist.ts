import { players } from '../db/db';

export const isPlayerExist = (name: string): boolean => {
  return Boolean(players.find((player) => player.name === name));
};