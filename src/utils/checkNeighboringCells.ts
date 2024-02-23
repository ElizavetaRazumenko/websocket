import { HUGE_SHIP_LENGTH, LARGE_SHIP_LENGTH } from '../constants/variables';
import { CellCoords, GameCell, GameField } from '../types/game';

type NeighborsCells = {
  status: GameCell;
  x: number;
  y: number;
};

const isCellsCorresponds = (
  field: GameField,
  { x, y }: CellCoords,
  condition: string
): boolean => {
  return (
    field[x - 1]?.[y] === condition ||
    field[x + 1]?.[y] === condition ||
    field[x][y - 1] === condition ||
    field[x][y + 1] === condition
  );
};

export const checkNeighboringCells = (
  cell: GameCell,
  field: GameField,
  { x, y }: CellCoords
): string => {
  // Medium cell checking
  if (cell === 'medium') {
    if (isCellsCorresponds(field, { x, y }, 'medium')) {
      return 'shot';
    }
    return 'killed';

    // Large cell checking
  } else if (cell === 'large') {
    if (isCellsCorresponds(field, { x, y }, 'large')) {
      return 'shot';
    } else {
      const shotCellNeighbors: NeighborsCells[] = getNeighboringCells(field, {
        x,
        y,
      }).filter((cell) => cell.status === 'shot');

      if (shotCellNeighbors.length === LARGE_SHIP_LENGTH - 1) {
        return 'killed';

        // if not two cells are shots, then one
      } else {
        const { x, y } = shotCellNeighbors[0];

        const shotNeighborCellForNeighborCell = getNeighboringCells(field, {
          x,
          y,
        }).filter((cell) => cell.status === 'shot');

        if (shotNeighborCellForNeighborCell.length) {
          return 'killed';
        } else {
          return 'shot';
        }
      }
    }

    // Huge cell checking
  } else {
    if (isCellsCorresponds(field, { x, y }, 'huge')) {
      return 'shot';
    } else {
      const shotCellNeighbors: NeighborsCells[] = getNeighboringCells(field, {
        x,
        y,
      }).filter((cell) => cell.status === 'shot');

      if (shotCellNeighbors.length === HUGE_SHIP_LENGTH - 2) {
        const shotNeighborCellForNeighborCell = shotCellNeighbors.filter(
          (cell) =>
            getNeighboringCells(field, {
              x: cell.x,
              y: cell.y,
            }).filter((cell) => cell.status === 'shot').length
        );
        if (shotNeighborCellForNeighborCell.length) {
          return 'killed';
        } else {
          return 'shot';
        }
      } else {
        const { x, y } = shotCellNeighbors[0];
        const shotNeighborCellForNeighborCell = getNeighboringCells(field, {
          x,
          y,
        }).filter((cell) => cell.status === 'shot');

        if (shotNeighborCellForNeighborCell.length) {
          const { x, y } = shotNeighborCellForNeighborCell[0];
          const shotNeighborsForCell = getNeighboringCells(field, {
            x,
            y,
          }).filter((cell) => cell.status === 'shot');

          if (shotNeighborsForCell.length) {
            return 'killed';
          } else {
            return 'shot';
          }
        } else {
          return 'shot';
        }
      }
    }
  }
};

function getNeighboringCells(
  field: GameField,
  { x, y }: CellCoords
): NeighborsCells[] {
  const numRows = field.length;
  const numCols = field[0].length;

  const neighbors = [];

  if (x > 0) {
    neighbors.push({ status: field[x - 1][y], x: x - 1, y });
  }

  if (x < numRows - 1) {
    neighbors.push({ status: field[x + 1][y], x: x + 1, y });
  }

  if (y > 0) {
    neighbors.push({ status: field[x][y - 1], x, y: y - 1 });
  }

  if (y < numCols - 1) {
    neighbors.push({ status: field[x][y + 1], x, y: y + 1 });
  }

  return neighbors;
}
