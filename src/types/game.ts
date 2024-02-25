/*
  [
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ]
*/
export type GameField = GameCell[][];

export type GameCell =
  | 'miss'
  | 'killed'
  | 'shot'
  | 'empty'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge';

export type Ship = {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
};

type Position = {
  x: number;
  y: number;
};

export type ShipType = 'small' | 'medium' | 'large' | 'huge';

export type PlayersShipsInfo = {
  player_1?: Ship[];
  player_2?: Ship[];
}

export type CellCoords = {
  x: number;
  y: number;
}


export type AdjacentCell = {
  status: GameCell;
  x: number;
  y: number;
};

export type AddShips = {
  gameId: number;
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    }
  ];
  indexPlayer: number;
};

export type Attack = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
};

export type RandomAttack = {
  gameId: number;
  indexPlayer: number;
};
