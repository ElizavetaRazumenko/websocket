import { GameField } from '../../types/game';
import { getSmallNumberId } from '../getNumberId';
import {
  Ship,
  checkNoAdjacentShips,
  checkShipPlace,
  getUnplacedShip,
} from './helpers';

export const takePlaceForMediumShips = (
  field: GameField,
  ships: Ship[]
): void => {
  for (let i = 0; i < 3; i++) {
    let row: number | undefined;
    let col: number | undefined;

    const ship = getUnplacedShip(ships, 'medium');
    const horizontal = Math.random() < 0.5;

    let validPlacement = false;

    while (!validPlacement) {
      if (horizontal) {
        row = getSmallNumberId(0, 9);
        col = getSmallNumberId(0, 9 - ship.size);
      } else {
        row = getSmallNumberId(0, 9 - ship.size);
        col = getSmallNumberId(0, 9);
      }

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
      if (horizontal) {
        for (let j = col; j < col + ship.size; j++) {
          field[row][j] = ship.type;
        }
      } else {
        for (let j = row; j < row + ship.size; j++) {
          field[j][col] = ship.type;
        }
      }
    }

    ship.placed = true;
  }
};
