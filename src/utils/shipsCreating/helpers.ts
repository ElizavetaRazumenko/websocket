import { GameField, ShipType } from '../../types/game';

export type Ship = {
  type: ShipType;
  size: number;
  placed: boolean;
};

export const getUnplacedShip = (ships: Ship[], type: ShipType): Ship =>
  ships.find((ship) => ship.type === type && !ship.placed)!;

export const checkShipPlace = (
  field: GameField,
  row: number,
  col: number,
  size: number,
  horizontal: boolean
): boolean => {
  if (horizontal) {
    for (let i = col - 1; i < col + size + 1; i++) {
      for (let j = row - 1; j <= row + 1; j++) {
        if (field[j]?.[i] && field[j][i] !== 'empty') {
          return false;
        }
      }
    }
  } else {
    for (let i = row - 1; i < row + size + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (field[i]?.[j] && field[i][j] !== 'empty') {
          return false;
        }
      }
    }
  }

  return true;
};

export const checkNoAdjacentShips = (
  field: GameField,
  row: number,
  col: number,
  size: number,
  horizontal: boolean
): boolean => {
  const startCol = col - 1 < 0 ? 0 : col - 1;
  const startRow = row - 1 < 0 ? 0 : row - 1;
  const endCol =
    col + (horizontal ? size : 1) > 9 ? 9 : col + (horizontal ? size : 1);
  const endRow =
    row + (horizontal ? 1 : size) > 9 ? 9 : row + (horizontal ? 1 : size);

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      if (field[i][j] !== 'empty') {
        return false;
      }
    }
  }

  return true;
};