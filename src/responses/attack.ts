import { attackHandler } from '../handlers/attackHandler';
import { Attack } from '../types/game';
import { findCurrentGame } from '../utils/findCurrentGame';
import { identiFyAttacker } from '../utils/identifyAttacker';


export const attack = (attackData: Attack) => {
  const currentGame = findCurrentGame(attackData.gameId);

  const { sendAttackPlayer, getAttackPlayer } = identiFyAttacker(
    currentGame,
    attackData.indexPlayer
  );

  if (sendAttackPlayer.turn) {
    const { x, y } = attackData;

    const args = {
      gameId: attackData.gameId,
      coords: { x, y },
      players: {
        sendAttackPlayer,
        getAttackPlayer
      }
    };

    attackHandler(args);
  }
};
