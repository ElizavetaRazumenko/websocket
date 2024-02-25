import { AdjacentCell, CellCoords, GameField } from '../types/game';

export const getSurroundingPoints = (
  cells: CellCoords[],
  field: GameField
): AdjacentCell[] => {
  const surroundingPoints: AdjacentCell[] = [];

  cells.forEach(({ x, y }) => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10) {
          surroundingPoints.push({ status: field[y][x], x: newX, y: newY });
        }
      }
    }
  });

  const uniquePoints = surroundingPoints.filter(
    (point, index, self) =>
      index === self.findIndex((p) => p.x === point.x && p.y === point.y)
  );

  const pointsWithoutSheepCoords = uniquePoints.filter(
    (point) => !cells.find((cell) => cell.x === point.x && cell.y === point.y)
  );

  return pointsWithoutSheepCoords;
};
