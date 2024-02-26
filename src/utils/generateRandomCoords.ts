import { CellCoords, GameField } from '../types/game';

export const generateRandomCoords = (field: GameField): CellCoords => {
  const markedCells = ['miss', 'killed', 'shot'];

  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  if (!markedCells.includes(field[y]?.[x])) {
    return { x, y };
  }
  return generateRandomCoords(field);
};
