import { GameField } from '../types/game';
import { createEmptyField } from './createGameField';
import { Ship } from './shipsCreating/helpers';
import { takePlaceForHugeShip } from './shipsCreating/takePlaceForHugeShip';
import { takePlaceForLargeShips } from './shipsCreating/takePlaceForLargeShips';
import { takePlaceForMediumShips } from './shipsCreating/takePlaceForMediumShips';
import { takePlaceForSmallShips } from './shipsCreating/takePlaceForSmallShips';

export const generateRandomField = (): GameField => {
  const field = createEmptyField();
  const ships: Ship[] = [
    { type: 'small', size: 1, placed: false },
    { type: 'small', size: 1, placed: false },
    { type: 'small', size: 1, placed: false },
    { type: 'small', size: 1, placed: false },
    { type: 'medium', size: 2, placed: false },
    { type: 'medium', size: 2, placed: false },
    { type: 'medium', size: 2, placed: false },
    { type: 'large', size: 3, placed: false },
    { type: 'large', size: 3, placed: false },
    { type: 'huge', size: 4, placed: false },
  ];

  takePlaceForHugeShip(field, ships);
  takePlaceForLargeShips(field, ships);
  takePlaceForMediumShips(field, ships);
  takePlaceForSmallShips(field, ships);

  return field;
};
