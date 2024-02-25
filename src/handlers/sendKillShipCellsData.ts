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
    neighbors.push(...adjacentCells);
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
        const adjacentKilledCellForCell = selectAdjacentCells(
          field,
          { x, y },
          'killed'
        ).filter(
          (cell) => cell.x !== cellCoords.x && cell.y !== cellCoords.y
        )[0] as AdjacentCell;

        killedCells.push(adjacentKilledCellForCell);

        if (shipType === 'huge') {
          const { x, y } = adjacentKilledCellForCell;

          const lastKilledCell = selectAdjacentCells(
            field,
            { x, y },
            'killed'
          ).filter(
            (cell) =>
              cell.x !== adjacentKilledCell.x && cell.y !== adjacentKilledCell.y
          )[0] as AdjacentCell;

          killedCells.push(lastKilledCell);
        }
      } else {
        if (shipType === 'huge') {
          const lastKilledCell = adjacentKilledCells.filter((cell) => selectAdjacentCells(
            field,
            {x: cell.x, y: cell.y },
            'killed'
          )).find((cell) => cell.x !== cellCoords.x && cell.y !== cellCoords.y) as AdjacentCell;

          killedCells.push(lastKilledCell);
        }
      }
    }

    neighbors.push(...getSurroundingPoints(killedCells, field));
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
