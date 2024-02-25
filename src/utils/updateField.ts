import { AdjacentCell, CellCoords, GameCell, GameField } from '../types/game';
import { selectAdjacentCells } from './selectAdjacentCells';

export const updateField = (
  cellStatus: GameCell,
  field: GameField,
  { x, y }: CellCoords
): void => {
  if (cellStatus === 'killed') {
    // for medium, large and huge
    if (field[y][x] !== 'small') {
      const shotCells = selectAdjacentCells(field, { x, y }, 'shot');
      shotCells.forEach((cell) => (field[cell.y][cell.x] = 'killed'));

      if (field[y][x] !== 'medium') {
        const shotAdjacentCellsToCells: AdjacentCell[] = [];

        shotCells.forEach((cell) => {
          const neighbors = selectAdjacentCells(
            field,
            { x: cell.x, y: cell.y },
            'shot'
          );

          shotAdjacentCellsToCells.push(...neighbors);
          neighbors.forEach((cell) => (field[cell.y][cell.x] = 'killed'));
        });

        if (field[y][x] === 'huge') {
          shotAdjacentCellsToCells.forEach((cell) => {
            const neighbors = selectAdjacentCells(
              field,
              { x: cell.x, y: cell.y },
              'shot'
            );
            neighbors.forEach((cell) => (field[cell.y][cell.x] = 'killed'));
          });
        }
      }
    }

    field[y][x] = 'killed';
  } else {
    field[y][x] = cellStatus;
  }
};
