import {
  CELL_LENGTH,
  LARGE_SHIP_LENGTH,
  MAX_CELLS_PER_STEP,
} from '../constants/variables';
import { CellCoords, GameCell, GameField } from '../types/game';

type AdjacentCells = {
  status: GameCell;
  x: number;
  y: number;
};

export const checkNeighboringCells = (
  cell: GameCell,
  field: GameField,
  { x, y }: CellCoords
): GameCell => {
  // Medium cell checking
  if (cell === 'medium') {
    if (selectAdjacentCells(field, { x, y }, 'medium').length) {
      return 'shot';
    }
    return 'killed';
    // Large cell checking
  } else if (cell === 'large') {
    if (selectAdjacentCells(field, { x, y }, 'large').length) {
      return 'shot';
    } else {
      const shotCells: AdjacentCells[] = selectAdjacentCells(
        field,
        { x, y },
        'shot'
      );

      if (shotCells.length === LARGE_SHIP_LENGTH - CELL_LENGTH) {
        return 'killed';
      } else {
        const { x, y } = shotCells[0];

        const shotCellsForCell = selectAdjacentCells(field, { x, y }, 'shot');

        return shotCellsForCell.length ? 'killed' : 'shot';
      }
    }
    // Huge cell checking
  } else {
    if (selectAdjacentCells(field, { x, y }, 'huge').length) {
      return 'shot';
    } else {
      const shotCells: AdjacentCells[] = selectAdjacentCells(
        field,
        { x, y },
        'shot'
      );

      if (shotCells.length === MAX_CELLS_PER_STEP) {
        const shotCellsForCell = shotCells.filter(
          (cell) =>
            selectAdjacentCells(field, { x: cell.x, y: cell.y }, 'shot').length
        );

        return shotCellsForCell.length ? 'killed' : 'shot';
      } else {
        const { x, y } = shotCells[0];
        const shotCellsForCell = selectAdjacentCells(field, { x, y }, 'shot');

        if (shotCellsForCell.length) {
          const { x, y } = shotCellsForCell[0];
          const shotCells = selectAdjacentCells(field, { x, y }, 'shot');

          return shotCells.length ? 'killed' : 'shot';
        } else {
          return 'shot';
        }
      }
    }
  }
};

function selectAdjacentCells(
  field: GameField,
  { x, y }: CellCoords,
  condition: string
): AdjacentCells[] {
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
}
