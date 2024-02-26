import { attackHandler } from '../handlers/attackHandler';
import { CellCoords, RandomAttack } from '../types/game';
import { findCurrentGame } from '../utils/findCurrentGame';
import { generateRandomCoords } from '../utils/generateRandomCoords';
import { identiFyAttacker } from '../utils/identifyAttacker';

export const randomAttack = (attackData: RandomAttack) => {
  const currentGame = findCurrentGame(attackData.gameId);

  const { sendAttackPlayer, getAttackPlayer } = identiFyAttacker(
    currentGame,
    attackData.indexPlayer
  );

  if (sendAttackPlayer.turn) {
    const { x, y } = generateRandomCoords(getAttackPlayer.field!) as CellCoords;

    const args = {
      gameId: attackData.gameId,
      coords: { x, y },
      players: {
        sendAttackPlayer,
        getAttackPlayer
      }
    };

    attackHandler(args);

    console.log('This user has carried out an random attack:');
    console.log(sendAttackPlayer);
    console.log(`By coordinates: X - ${x}, Y - ${y}`);
  }
};
