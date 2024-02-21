import { winners, usersConnections } from '../db/db';

export const updateWinners = () => {
  const responseData = {
    type: 'update_winners',
    data: JSON.stringify(winners),
    id: 0,
  };

  usersConnections.forEach((connection) => {
    connection.send(JSON.stringify(responseData));
  });
};
