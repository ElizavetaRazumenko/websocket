import { WebSocket } from 'ws';
import { AddShips, Attack, GameField, RandomAttack } from './game';

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
};

export type Winner = {
  name: string;
  wins: number;
};

export type Game = {
  id: number;
  player_1: UserGameInfo;
  player_2: UserGameInfo;
};

export type UserGameInfo = {
  wsId: number;
  turn: boolean;
  field?: GameField;
};

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
