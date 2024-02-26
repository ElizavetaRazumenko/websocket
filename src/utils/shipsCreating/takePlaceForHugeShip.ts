import { GameField } from '../../types/game';
import { getSmallNumberId } from '../getNumberId';
import {
  Ship,
  checkNoAdjacentShips,
  checkShipPlace,
  getUnplacedShip,
} from './helpers';

export const takePlaceForHugeShip = (field: GameField, ships: Ship[]): void => {
  let validPlacement = false;

  let row: number | undefined;
  let col: number | undefined;

  const ship = getUnplacedShip(ships, 'huge');

  while (!validPlacement) {
    row = getSmallNumberId(0, 5);
    col = getSmallNumberId(0, 5);

    const horizontal = getSmallNumberId(0, 1) === 0;

    validPlacement = checkShipPlace(field, row, col, ship.size, horizontal);

    if (validPlacement) {
      validPlacement = checkNoAdjacentShips(
        field,
        row,
        col,
        ship.size,
        horizontal
      );
    }
  }

  if (row !== undefined && col !== undefined) {
    if (ship.size === 4) {
      for (let i = row; i < row + ship.size; i++) {
        field[i][col] = ship.type;
      }
    }
  }

  ship.placed = true;
};
