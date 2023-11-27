import styled from '@emotion/styled';

import { BORDER_RADIUS_FULL, SHADOW_HERO_AVATAR, TRANSITION_DEFAULT } from '../../styles';
import { flexHelper } from '../../utils';

import { nftHeroes } from './HeroSelector.mock';

const HeroSelectorWrapper = styled.div({
  ...flexHelper('center', 'center'),
  gap: '36px',
});

const HeroAvatar = styled.div<{ selected: boolean }>(
  {
    width: 125,
    height: 125,
    borderRadius: BORDER_RADIUS_FULL,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: TRANSITION_DEFAULT,

    '&:hover': {
      transform: 'scale(1.2)',
    },

    img: {
      width: 125,
      height: 125,
      borderRadius: BORDER_RADIUS_FULL,
    },
  },
  ({ selected }) =>
    selected
      ? {
          boxShadow: SHADOW_HERO_AVATAR,
          transform: 'scale(1.1)',
        }
      : undefined,
);

type HeroSelectorProps = {
  selectedHero?: number;
  onSelect: (id: number) => void;
};

export const HeroSelector = ({ selectedHero, onSelect }: HeroSelectorProps) => {
  return (
    <HeroSelectorWrapper>
      {nftHeroes.map(({ id, avatar }) => (
        <HeroAvatar key={id} onClick={() => onSelect(id)} selected={selectedHero === id}>
          <img src={avatar} alt={`hero avatar ${id}`} />
        </HeroAvatar>
      ))}
    </HeroSelectorWrapper>
  );
};
