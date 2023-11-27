import { useNavigate } from 'react-router';
import styled from '@emotion/styled';

import { Button, Icon, PointsBlock, Text } from '../../../../components';
import { routes } from '../../../../containers';
import { TRANSITION_FIGHT_STAGE } from '../../../../styles';
import { flexHelper } from '../../../../utils';

const FinalBlockWrapper = styled.div<{ isFinalStage: boolean }>(
  {
    position: 'absolute',
    top: 75,
    left: 'calc(50% - 200px)',
    zIndex: 20,
    width: 400,
    ...flexHelper('center', 'center', 'column'),
    transition: TRANSITION_FIGHT_STAGE,
  },
  ({ isFinalStage }) => ({
    opacity: isFinalStage ? 1 : 0,
    transform: isFinalStage ? 'none' : 'translateY(200%)',
  }),
);

type FinalBlockProps = {
  isFinalStage: boolean;
  healthPoints: { player: number; bot: number };
};

export const FinalBlock = ({ isFinalStage, healthPoints }: FinalBlockProps) => {
  const navigate = useNavigate();

  return (
    <FinalBlockWrapper isFinalStage={isFinalStage}>
      <Text variant="h1" color="white" css={{ marginBottom: healthPoints.player === 0 ? 0 : 31 }}>
        {healthPoints.bot === 0 && healthPoints.player === 0
          ? 'Draw'
          : `${healthPoints.player === 0 ? 'Bot' : 'You'} win`}
      </Text>
      {healthPoints.player !== 0 && <PointsBlock isHidden={false} amount={10} isSmall />}
      <Button
        variant="secondary"
        text="Home"
        size="lg"
        iconImg={<Icon type="arrow-right" color="white" width={17} height={13} />}
        onClick={() => navigate(routes.home.root)}
        sx={{ marginTop: 42, width: 271 }}
      />
    </FinalBlockWrapper>
  );
};
