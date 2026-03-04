export const invisibleCardsCalc = (prop: any[]): number => {
  const amount = 3 - (prop.length % 3);
  return amount;
};
