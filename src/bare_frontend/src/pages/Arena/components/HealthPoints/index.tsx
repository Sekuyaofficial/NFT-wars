import styled from '@emotion/styled';
import { times } from 'lodash';

import { BORDER_RADIUS_FULL, COLOR_HP_BG } from '../../../../styles';
import { flexHelper } from '../../../../utils';
import { heart } from '../../assets';

const HealthColumn = styled.div({
  ...flexHelper('flex-start', 'center', 'column'),
  gap: '8px',
});

const HealthPoint = styled.div({
  padding: '7px',
  width: 36,
  height: 36,
  background: COLOR_HP_BG,
  borderRadius: BORDER_RADIUS_FULL,
});

type HealthPointsProps = {
  points: number;
};

export const HealthPoints = ({ points }: HealthPointsProps) => (
  <HealthColumn>
    {times(points).map((index) => (
      <HealthPoint key={`${index + 1}`}>
        <img src={heart} alt="heart" width={22} height={22} />
      </HealthPoint>
    ))}
  </HealthColumn>
);
