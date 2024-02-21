import { playerRooms, players } from "../db/db";
import { AddUserToRoom, Player, WebSocketWithId } from "../db/types";

export const addUserToRoom = (ws: WebSocketWithId, { indexRoom }: AddUserToRoom) => {
    const room = playerRooms[indexRoom];

    if (!room || room.playerNames.length > 1) {
        return;
    }

    const player = players.find((player) => room.playerNames.includes(player.name));

    if (player?.wsId === ws.id) {
        return;
    }

    const newPlayer = players.find((player) => player.wsId === ws.id) as Player;
    room.playerNames.push(newPlayer.name);
}