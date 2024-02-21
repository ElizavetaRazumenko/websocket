import { WebSocket } from 'ws';

export interface WebSocketWithId extends WebSocket {
  id: number;
}

export type Player = {
  wsId: number;
  name: string;
  password: string;
  wins: number;
};

export type PlayerRooms = {
  roomId: number;
  playerNames: string[];
}

export type Winner = {
  name: string;
  wins: number;
}

export type Game = {
  id: number;
  player_1: UserGameInfo;
  player_2: UserGameInfo;
}

export type UserGameInfo = {
  wsId: number;
  turn: boolean;
  field?: GameCells | [];
}

export type GameField = GameCells[][];

export type GameCells =
  | 'miss'
  | 'killed'
  | 'shot'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge6'
  | 'empty';


export type FrontRequest = {
  type: string;
  data: RequestData;
  id: 0;
};

export type RequestData =
  | PlayerReg
  | CreateRoom
  | AddUserToRoom
  | AddShips
  | Attack
  | RandomAttack;

export type PlayerReg = {
  name: string;
  password: string;
};

export type CreateRoom = string;

export type AddUserToRoom = {
  indexRoom: number;
};

export type AddShips = {
  gameId: number;
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: number;
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
