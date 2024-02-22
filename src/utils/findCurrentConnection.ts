import { usersConnections } from '../db/db';
import { WebSocketWithId } from '../types/core';

export const findCurrentConnection = (id: number):WebSocketWithId => usersConnections.find(
    (connection) => connection.id === id
  ) as WebSocketWithId;
