import { FIELD_SIZE } from '../constants/variables';
import { AdjacentCell, CellCoords, GameField } from '../types/game';

export const getSurroundingPoints = (
  cells: CellCoords[],
  field: GameField,
  currentCell: CellCoords
): AdjacentCell[] => {
  const surroundingPoints: AdjacentCell[] = [];

  cells.forEach(({ x, y }) => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX < FIELD_SIZE && newY >= 0 && newY < FIELD_SIZE) {
          surroundingPoints.push({
            status: field[newY][newX],
            x: newX,
            y: newY,
          });
        }
      }
    }
  });

  const uniquePoints = surroundingPoints.filter(
    (point, index, self) =>
      index === self.findIndex((p) => p.x === point.x && p.y === point.y)
  );

  const indexOfCurrentCell = uniquePoints.findIndex(
    (cell) => cell.x === currentCell.x && cell.y === currentCell.y
  );

  uniquePoints.splice(indexOfCurrentCell, 1);

  return uniquePoints;
};
