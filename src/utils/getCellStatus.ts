import { CellCoords, GameCell, GameField } from '../types/game';
import { checkNeighboringCells } from './checkNeighboringCells';

export const getCellStatus = (cell: GameCell, field: GameField, coords: CellCoords): string => {
  switch (cell) {
    case 'miss':
    case 'empty':
      return 'miss';
    case 'killed':
    case 'shot':
      return 'shot';
    case 'small':
      return 'killed';
    case 'medium': 
    case 'large':
    case 'huge':
      return checkNeighboringCells(cell, field, coords);
  }
};