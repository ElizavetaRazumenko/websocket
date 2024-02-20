import { players } from '../db/db';

export const isPlayerExist = (name: string): boolean => {
  return !!players.find((player) => player.name === name);
};