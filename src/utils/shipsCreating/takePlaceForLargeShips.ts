import { GameField } from '../../types/game';
import { getSmallNumberId } from '../getNumberId';
import {
  Ship,
  checkNoAdjacentShips,
  checkShipPlace,
  getUnplacedShip,
} from './helpers';

export const takePlaceForLargeShips = (
  field: GameField,
  ships: Ship[]
): void => {
  for (let i = 0; i < 2; i += 1) {
    let validPlacement = false;

    let row: number | undefined;
    let col: number | undefined;

    const ship = getUnplacedShip(ships, 'large');
    const horizontal = Math.random() < 0.5;

    while (!validPlacement) {
      if (horizontal) {
        row = getSmallNumberId(0, 9);
        col = getSmallNumberId(0, 7);
      } else {
        row = getSmallNumberId(0, 7);
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
      if (ship.type === 'large') {
        if (horizontal) {
          for (let j = col; j < col + ship.size; j += 1) {
            field[row][j] = ship.type;
          }
        } else {
          for (let j = row; j < row + ship.size; j += 1) {
            field[j][col] = ship.type;
          }
        }
      }
    }

    ship.placed = true;
  }
};
