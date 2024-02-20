import { players, roomsWithOnePlayer } from '../db/db';
import { IdentificationalWebSocket, Player } from '../db/types';

export const updateRoom = (ws: IdentificationalWebSocket) => {
    const data = roomsWithOnePlayer.map((room) => {
        const roomUser = players.find((player) => player.id === room.playerId) as Player;
        return { roomId: room.roomId, roomUsers: [{ name: roomUser.name, index: players.indexOf(roomUser) }]}
    });

    const responseData = {
        type: "update_room",
        data,
        id: 0,
    };

    ws.send(JSON.stringify(responseData));
};