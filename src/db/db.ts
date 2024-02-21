import { WebSocketWithId, Player, PlayerRooms, Winner, Game } from './types';

export let usersConnections: WebSocketWithId[] = [];

export const players: Player[] = [];

export const winners: Winner[] = [];

export const playerRooms: PlayerRooms[] = [];

export const currentGames: Game[] = [];

export const removeUserConnection = (id: number) => {
  usersConnections = usersConnections.filter(
    (connection) => connection.id !== id,
  );
};