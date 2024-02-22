import {
  WebSocketWithId,
  Player,
  PlayerRooms,
  Winner,
  Game,
} from '../types/core';

export const usersConnections: WebSocketWithId[] = [];

export const players: Player[] = [];

export const winners: Winner[] = [];

export const playerRooms: PlayerRooms[] = [];

export const currentGames: Game[] = [];

export const removeUserConnection = (id: number) => {
  const deletingPosition = usersConnections.findIndex(
    (connection) => connection.id === id
  );
  usersConnections.splice(deletingPosition, 1);
};

export const removePlayerRoom = (id: number) => {
  const deletingPosition = playerRooms.findIndex((room) => room.roomId === id);
  playerRooms.splice(deletingPosition, 1);
};
