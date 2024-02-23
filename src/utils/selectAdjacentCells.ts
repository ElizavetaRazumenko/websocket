import { AdjacentCells, CellCoords, GameField } from '../types/game';

export const selectAdjacentCells = (
  field: GameField,
  { x, y }: CellCoords,
  condition: string
): AdjacentCells[] => {
  const numRows = field.length;
  const numCols = field[0].length;

  const neighbors: AdjacentCells[] = [];

  if (x > 0) {
    neighbors.push({ status: field[y][x - 1], x: x - 1, y });
  }

  if (x < numCols - 1) {
    neighbors.push({ status: field[y][x + 1], x: x + 1, y });
  }

  if (y > 0) {
    neighbors.push({ status: field[y - 1][x], x, y: y - 1 });
  }

  if (y < numRows - 1) {
    neighbors.push({ status: field[y + 1][x], x, y: y + 1 });
  }

  return neighbors.filter((cell) => cell.status === condition);
};
