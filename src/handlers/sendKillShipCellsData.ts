import { MAX_CELLS_PER_STEP } from '../constants/variables';
import { WebSocketWithId } from '../types/core';
import { AdjacentCell, CellCoords, GameField, ShipType } from '../types/game';
import { getSurroundingPoints } from '../utils/getSurroundingPoints';
import { selectAdjacentCells } from '../utils/selectAdjacentCells';

export const sendKillShipCellData = (
  field: GameField,
  cellCoords: CellCoords,
  shipType: ShipType,
  currentPlayerId: number,
  ...connections: WebSocketWithId[]
) => {
  const neighbors: AdjacentCell[] = [];
  const adjacentCells = selectAdjacentCells(field, cellCoords, '', true);

  if (shipType === 'small') {
    neighbors.push(...getSurroundingPoints([cellCoords], field, cellCoords));
  } else {
    const { x, y } = cellCoords;
    const killedCells: AdjacentCell[] = [{ status: field[y][x], x, y }];

    const adjacentKilledCells = adjacentCells.filter(
      (cell) => cell.status === 'killed'
    );
    killedCells.push(...adjacentKilledCells);

    if (shipType === 'large' || shipType === 'huge') {
      if (adjacentKilledCells.length < MAX_CELLS_PER_STEP) {
        const adjacentKilledCell = adjacentKilledCells[0];
        const { x, y } = adjacentKilledCell;

        const adjacentKilledCellsForCell = selectAdjacentCells(
          field,
          { x, y },
          'killed'
        );

        const indexOfCurrentCell = adjacentKilledCellsForCell.findIndex(
          (cell) => cell.x === cellCoords.x && cell.y === cellCoords.y
        );

        adjacentKilledCellsForCell.splice(indexOfCurrentCell, 1);

        killedCells.push(...adjacentKilledCellsForCell);

        if (shipType === 'huge') {
          const { x, y } = adjacentKilledCellsForCell[0];

          const cellsWithLastKilledCell = selectAdjacentCells(
            field,
            { x, y },
            'killed'
          );

          const indexOfCurrentCell = cellsWithLastKilledCell.findIndex(
            (cell) =>
              cell.x === adjacentKilledCell.x && cell.y === adjacentKilledCell.y
          );

          cellsWithLastKilledCell.splice(indexOfCurrentCell, 1);
          killedCells.push(...cellsWithLastKilledCell);
        }
      } else {
        if (shipType === 'huge') {
          const cellWithLastKilledCell = adjacentKilledCells.filter((cell) =>
            selectAdjacentCells(field, { x: cell.x, y: cell.y }, 'killed')
          );

          const indexOfCurrentCell = cellWithLastKilledCell.findIndex(
            (cell) => cell.x === cellCoords.x && cell.y === cellCoords.y
          );

          cellWithLastKilledCell.splice(indexOfCurrentCell, 1);
  
          killedCells.push(...cellWithLastKilledCell);
        }
      }
    }

    neighbors.push(...getSurroundingPoints(killedCells, field, cellCoords));
  }

  neighbors.forEach((cell) => {
    const responseData = {
      type: 'attack',
      data: JSON.stringify({
        position: {
          x: cell.x,
          y: cell.y,
        },
        currentPlayer: currentPlayerId,
        status: cell.status,
      }),
      id: 0,
    };

    connections.forEach((connection) => {
      connection.send(JSON.stringify(responseData));
    });
  });
};
