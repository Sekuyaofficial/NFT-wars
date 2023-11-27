import styled from '@emotion/styled';

import { Text } from '../../../../components';
import { COLOR_ICON_BUTTON, COLOR_WHITE, TRANSITION_DEFAULT } from '../../../../styles';
import { HeroBodyPart } from '../../Arena.mocked';
import { borderActionTabLeft, borderActionTabRight } from '../../assets';

const ActionTabWrapper = styled.button<{ direction: 'left' | 'right'; active: boolean }>(
  {
    width: 188,
    height: 59,
    transition: TRANSITION_DEFAULT,
    p: {
      transition: TRANSITION_DEFAULT,
    },
  },
  ({ direction, active, disabled }) => ({
    paddingLeft: 16,
    paddingRight: 24,
    background: `url(${direction === 'left' ? borderActionTabLeft : borderActionTabRight})${
      active ? `, ${COLOR_WHITE}` : ''
    }`,
    clipPath:
      direction === 'left'
        ? 'polygon(100% 0, 100% 40px, 168px 100%, 0 100%, 0 0)'
        : 'polygon(100% 0, 100% 100%, 21px 100%, 0 39px, 0 0)',
    '&:hover': {
      ...(!disabled && {
        background: `url(${direction === 'left' ? borderActionTabLeft : borderActionTabRight}), ${
          active ? COLOR_WHITE : COLOR_ICON_BUTTON
        }`,
      }),
    },
    ...(disabled && { cursor: 'none' }),
  }),
);

type ActionTabProps = {
  direction: 'left' | 'right';
  active: boolean;
  actionType: 'attack' | 'block';
  actionOpponentItem: HeroBodyPart;
  onSelect: () => void;
  disabled: boolean;
};

export const ActionTab = ({
  direction,
  active,
  actionType,
  actionOpponentItem,
  onSelect,
  disabled,
}: ActionTabProps) => {
  return (
    <ActionTabWrapper direction={direction} active={active} onClick={onSelect} disabled={disabled}>
      <Text color={active ? 'black' : 'white'} textAlign={direction}>{`${actionType} ${actionOpponentItem}`}</Text>
    </ActionTabWrapper>
  );
};
