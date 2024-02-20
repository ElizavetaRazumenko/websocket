import { WebSocketWithId, Player, PlayerRooms } from './types';

export let usersConnections: WebSocketWithId[] = [];

export const players: Player[] = [];

export const playerRooms: PlayerRooms[] = [];

export const removeUserConnection = (id: string) => {
  usersConnections = usersConnections.filter(
    (connection) => connection.id !== id,
  );
};