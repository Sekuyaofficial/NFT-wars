import styled from '@emotion/styled';

import { Icon, Text } from '../../../../components';
import {
  BORDER_RADIUS_M,
  BORDER_RADIUS_S,
  SHADOW_BATTLEGROUND_CARD,
  TRANSITION_DEFAULT,
  TRANSITION_START_STAGE,
} from '../../../../styles';
import { flexHelper } from '../../../../utils';
import { arenaBgLeft, arenaBgRight, battlegroundMap } from '../../assets';

const StartLayerWrapper = styled.div({
  position: 'absolute',
  top: 0,
  zIndex: 15,
  borderRadius: BORDER_RADIUS_M,
  width: 'calc(100vw - 36px)',
  height: 'calc(100vh - 36px)',
  ...flexHelper('center'),
  overflow: 'hidden',
  svg: {
    position: 'absolute',
    top: '1.5%',
    left: 'calc(50% - 126px)',
    zIndex: 20,
    transition: TRANSITION_DEFAULT,
  },
});

const StartLayerWrapperBackgroundImage = styled.img({
  width: 'calc(50% + 160px)',
  height: '100%',
  objectFit: 'cover',
  transition: TRANSITION_START_STAGE,
});

const BattlegroundBlock = styled.div<{ isShown: boolean }>(
  {
    position: 'absolute',
    bottom: 20,
    zIndex: 20,
    ...flexHelper('flex-start', 'center', 'column'),
    gap: '16px',
    transition: TRANSITION_START_STAGE,
  },
  ({ isShown }) => ({
    transform: isShown ? 'none' : 'translateY(200%)',
  }),
);

const BattlegroundCard = styled.div({
  width: 232,
  height: 168,
  border: '3px solid white',
  borderRadius: BORDER_RADIUS_S,
  boxShadow: SHADOW_BATTLEGROUND_CARD,
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

type StartLayerProps = {
  isShown: boolean;
};

export const StartLayer = ({ isShown }: StartLayerProps) => {
  return (
    <StartLayerWrapper>
      <StartLayerWrapperBackgroundImage
        src={arenaBgLeft}
        alt="arena bg left"
        css={{
          marginRight: -301,
          clipPath: 'polygon(0 0, calc(100% - 44px) 0, calc(100% - 253px) 100%, 0 100%)',
          transform: isShown ? 'none' : 'translateX(-100%)',
        }}
      />
      <StartLayerWrapperBackgroundImage
        src={arenaBgRight}
        alt="arena bg right"
        css={{
          marginLeft: 0,
          clipPath: 'polygon(256px 0, 100% 0, 100% 100%, 48px 100%)',
          transform: isShown ? 'none' : 'translateX(100%)',
        }}
      />
      <Icon type="versus" width={252} height={800} cssProps={{ scale: isShown ? 1 : 0 }} />
      <BattlegroundBlock isShown={isShown}>
        <BattlegroundCard>
          <img src={battlegroundMap} alt="battleground map" />
        </BattlegroundCard>
        <Text variant="subtitle2" color="white" textAlign="center">
          Location
        </Text>
      </BattlegroundBlock>
    </StartLayerWrapper>
  );
};
