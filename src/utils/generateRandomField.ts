import { GameField } from '../types/game';

export const generateRandomField = (): GameField => {
    const field: GameField = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => 'empty')
    );

    const ships: { size: number; count: number }[] = [
        { size: 1, count: 4 },
        { size: 2, count: 3 },
        { size: 3, count: 2 },
        { size: 4, count: 1 },
    ];

    function canPlaceShip(row: number, col: number, size: number, horizontal: boolean): boolean {
        if (horizontal) {
            if (col + size > 10) return false;
            for (let i = col; i < col + size; i++) {
                if (field[row][i] !== 'empty') return false;
            }
        } else {
            if (row + size > 10) return false;
            for (let i = row; i < row + size; i++) {
                if (field[i][col] !== 'empty') return false;
            }
        }
        return true;
    }

    function placeShip(row: number, col: number, size: number, horizontal: boolean): void {
        if (horizontal) {
            for (let i = col; i < col + size; i++) {
                field[row][i] = 'small';
            }
        } else {
            for (let i = row; i < row + size; i++) {
                field[i][col] = 'small';
            }
        }
    }

    for (const ship of ships) {
        for (let i = 0; i < ship.count; i++) {
            let row: number, col: number, horizontal: boolean;
            do {
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
                horizontal = Math.random() < 0.5;
            } while (!canPlaceShip(row, col, ship.size, horizontal));

            placeShip(row, col, ship.size, horizontal);
        }
    }

    return field;
};

