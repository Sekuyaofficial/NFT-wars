import { useMemo } from 'react';
import { useLocation } from 'react-router';
import styled from '@emotion/styled';

import { Text } from '../../../../components';
import { nftHeroes } from '../../../../containers';
import { BORDER_RADIUS_XS, SHADOW_HERO_CARD, TRANSITION_FIGHT_STAGE } from '../../../../styles';
import { flexHelper } from '../../../../utils';
import { HealthPoints } from '../index';

const HeroBlockWrapper = styled.div<{ isPlayer: boolean; isHidden: boolean }>(
  {
    width: 360,
    gap: '24px',
    transition: TRANSITION_FIGHT_STAGE,
  },
  ({ isPlayer, isHidden }) => ({
    transform: isHidden ? `translateX(${isPlayer ? '-' : ''}200%)` : 'none',
    ...flexHelper(isPlayer ? 'flex-end' : 'flex-start'),
  }),
);

const HeroCard = styled.div({
  marginBottom: 20,
  width: 300,
  height: 392,
  border: '4px solid white',
  borderRadius: BORDER_RADIUS_XS,
  boxShadow: SHADOW_HERO_CARD,
  overflow: 'hidden',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

type HeroBlockProps = {
  isHidden: boolean;
  isPlayer: boolean;
  healthPoints: number;
};

export const HeroBlock = ({ isHidden, isPlayer, healthPoints }: HeroBlockProps) => {
  const {
    state: { heroId },
  } = useLocation();

  const selectedHeroImage = useMemo(() => nftHeroes.find(({ id }) => id === heroId)?.image || '', [heroId]);

  const botHeroImage = useMemo(() => {
    const heroesWithoutSelected = nftHeroes.filter(({ id }) => id !== heroId);
    return heroesWithoutSelected[Math.floor(Math.random() * 3)].image;
  }, [heroId]);

  return (
    <HeroBlockWrapper isPlayer={isPlayer} isHidden={isHidden}>
      {isPlayer && <HealthPoints points={healthPoints} />}
      <div>
        <HeroCard>
          <img
            src={isPlayer ? selectedHeroImage : botHeroImage}
            alt={`${isPlayer ? 'player' : 'opponent'} hero avatar`}
          />
        </HeroCard>
        <Text variant="subtitle2" color="white" textAlign="center">
          {isPlayer ? 'Player' : 'Opponent'}
        </Text>
      </div>
      {!isPlayer && <HealthPoints points={healthPoints} />}
    </HeroBlockWrapper>
  );
};
