export type HeroBodyPart = 'head' | 'body' | 'leg';
export type Stage = 'none' | 'start' | 'round' | 'fight' | 'final';
export type SelectedActions = { attack: HeroBodyPart | undefined; block: HeroBodyPart | undefined };
export type BattleLogItem = {
  attackedByPlayerBodyPart: HeroBodyPart;
  attackedByBotBodyPart: HeroBodyPart;
  isAttackSuccess: boolean;
  isBlockSuccess: boolean;
};

export const heroBodyParts: HeroBodyPart[] = ['head', 'body', 'leg'];
