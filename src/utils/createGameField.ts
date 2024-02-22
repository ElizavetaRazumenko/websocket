import { FIELD_SIZE } from '../constants/variables';
import { GameField, Ship } from '../types/game';

export const createGameField = (ships: Ship[]): GameField => {
  const field: GameField = Array.from({ length: FIELD_SIZE }, () =>
    Array(FIELD_SIZE).fill('empty')
  );

  for (const ship of ships) {
    const { direction, length, position } = ship;
    const { x, y } = position;

    for (let i = 0; i < length; i = i + 1) {
      const cellX = direction ? x : x + i;
      const cellY = direction ? y + i : y;

      field[cellY][cellX] = ship.type;
    }
  }

  return field;
};
