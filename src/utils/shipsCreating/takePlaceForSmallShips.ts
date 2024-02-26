import { GameField } from '../../types/game';
import { getSmallNumberId } from '../getNumberId';
import {
  Ship,
  checkNoAdjacentShips,
  checkShipPlace,
  getUnplacedShip,
} from './helpers';

export const takePlaceForSmallShips = (
  field: GameField,
  ships: Ship[]
): void => {
  for (let i = 0; i < 4; i++) {
    let validPlacement = false;

    let row: number | undefined;
    let col: number | undefined;

    const ship = getUnplacedShip(ships, 'small');

    while (!validPlacement) {
      row = getSmallNumberId(0, 9);
      col = getSmallNumberId(0, 9);

      validPlacement = checkShipPlace(field, row, col, ship.size, true);

      if (validPlacement) {
        validPlacement = checkNoAdjacentShips(field, row, col, ship.size, true);
      }
    }

    if (row !== undefined && col !== undefined) {
      field[row][col] = ship.type;
    }

    ship.placed = true;
  }
};
