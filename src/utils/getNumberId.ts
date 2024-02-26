export const getNumberId = (): number => Math.ceil(Math.random()*10000);

export const getSmallNumberId = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;