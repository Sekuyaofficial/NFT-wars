import styled from '@emotion/styled';

import { sun } from '../../assets/images';
import { BORDER_RADIUS_L, COLOR_POINTS_BG, COLOR_WHITE } from '../../styles';
import { flexHelper } from '../../utils';
import { Text } from '../Text';

const PointsBlockWrapper = styled.div<{ isHidden: boolean; isSmall: boolean }>(
  {
    padding: 16,
    height: 64,
    borderRadius: BORDER_RADIUS_L,
    background: COLOR_POINTS_BG,
    border: `1px solid ${COLOR_WHITE}`,
    ...flexHelper('flex-start', 'center'),
    gap: '8.2px',
  },
  ({ isHidden, isSmall }) => ({
    visibility: isHidden ? 'hidden' : 'visible',
    minWidth: isSmall ? 140 : 188,
  }),
);

const PointImage = styled.img`
  width: 39px;
  height: 39px;
`;

type PointsBlockProps = {
  isHidden: boolean;
  amount: string | number;
  isSmall?: boolean;
};

export const PointsBlock = ({ amount, isHidden, isSmall = false }: PointsBlockProps) => (
  <PointsBlockWrapper isHidden={isHidden} isSmall={isSmall}>
    <PointImage src={sun} alt="sun" />
    <Text variant="subtitle1" color="white" css={{ paddingBottom: 3 }}>
      {amount}
    </Text>
  </PointsBlockWrapper>
);
