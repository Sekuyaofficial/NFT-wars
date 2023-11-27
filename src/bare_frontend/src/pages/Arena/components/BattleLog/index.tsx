import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { FontFamily, Text } from '../../../../components';
import {
  COLOR_ACCENT,
  COLOR_BATTLE_INFO_BG,
  COLOR_DAMAGE,
  COLOR_WHITE,
  TRANSITION_FIGHT_STAGE,
} from '../../../../styles';
import { flexHelper } from '../../../../utils';
import { BattleLogItem } from '../../Arena.mocked';

const BattleLogWrapper = styled.div<{ isFightStage: boolean }>(
  {
    padding: '24px 27px',
    width: '100%',
    height: 150,
    ...flexHelper('flex-start', 'flex-start', 'column'),
    gap: 14,
    overflowY: 'scroll',
    background: COLOR_BATTLE_INFO_BG,
    border: `1px solid ${COLOR_WHITE}`,
    borderRadius: '20px',
    transition: TRANSITION_FIGHT_STAGE,
  },
  ({ isFightStage }) => ({
    transform: isFightStage ? 'none' : 'translateY(200%)',
  }),
);

const RoundInfoText = styled(Text)({
  fontFamily: FontFamily.HammersmithOne,
  paddingBottom: 0,
});

const DamageText = styled.span({
  color: COLOR_DAMAGE,
});

const AccentText = styled.span({
  color: COLOR_ACCENT,
});

type BattleLogProps = {
  battleLog: BattleLogItem[];
  isFightStage: boolean;
};

export const BattleLog = ({ battleLog, isFightStage }: BattleLogProps) => {
  const endBattleLogListRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isFightStage && battleLog.length > 1) {
      endBattleLogListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [battleLog, isFightStage]);

  return (
    <BattleLogWrapper isFightStage={isFightStage}>
      {battleLog.map(({ attackedByPlayerBodyPart, attackedByBotBodyPart, isAttackSuccess, isBlockSuccess }) => (
        <>
          <RoundInfoText>
            Player attacked opponent`s{' '}
            <AccentText>
              {attackedByPlayerBodyPart}
              {isAttackSuccess && '. '}
            </AccentText>
            {!isAttackSuccess && ' but attack was blocked.'}
            {isAttackSuccess && <DamageText>- 1 HP</DamageText>}
          </RoundInfoText>
          <RoundInfoText>
            Player`s <AccentText>{attackedByBotBodyPart}</AccentText> was attacked
            {isBlockSuccess ? ' but attack was blocked.' : '. '}
            {!isBlockSuccess && <DamageText>- 1 HP</DamageText>}
          </RoundInfoText>
        </>
      ))}
      <div ref={endBattleLogListRef} />
    </BattleLogWrapper>
  );
};
