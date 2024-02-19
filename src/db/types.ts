export type Player = {
  name: string;
  password: string;
  wins: number;
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

export type RoomPlayers = {
  name: string;
  index: string;
}
