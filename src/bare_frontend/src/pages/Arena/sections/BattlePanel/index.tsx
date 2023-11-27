import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import styled from '@emotion/styled';

import { Button, Icon, Text } from '../../../../components';
import { BORDER_RADIUS_S, COLOR_WHITE, TRANSITION_FIGHT_STAGE, TRANSITION_ROUND_STAGE } from '../../../../styles';
import { flexHelper, sleep } from '../../../../utils';
import { BattleLogItem, HeroBodyPart, heroBodyParts, SelectedActions, Stage } from '../../Arena.mocked';
import { ActionTab, BattleLog, FinalBlock, HeroBlock } from '../../components';

const ArenaRow = styled.div({
  marginTop: 20,
  position: 'relative',
  zIndex: 20,
  maxWidth: 1300,
  width: '100%',
  ...flexHelper('space-between', 'flex-start'),
});

const RoundTitle = styled(Text)<{ isRoundStage: boolean }>(
  {
    position: 'absolute',
    top: 150,
    left: 'calc(50% - 200px)',
    width: 400,
    transition: TRANSITION_ROUND_STAGE,
  },
  ({ isRoundStage }) => ({
    transform: isRoundStage ? 'none' : 'rotate3d(1, 0, 0, 90deg) scale(0.5, 1)',
  }),
);

const BattleMainBlock = styled.div<{ isFightStage: boolean }>(
  {
    marginTop: -48,
    maxWidth: 532,
    width: '100%',
    height: 'max-content',
    transition: TRANSITION_FIGHT_STAGE,
    ...flexHelper('flex-start', 'center', 'column'),
  },
  ({ isFightStage }) => ({
    opacity: isFightStage ? 1 : 0,
  }),
);

const RoundHeader = styled.div({
  width: 140,
  height: 36,
  border: `1px solid ${COLOR_WHITE}`,
  borderRadius: BORDER_RADIUS_S,
  ...flexHelper('center', 'center'),
});

const ActionsHeader = styled.div({
  marginTop: 30,
  padding: '0 75px 0 65px',
  width: '100%',
  ...flexHelper('space-between', 'center'),
});

const ActionsRow = styled.div({
  padding: '0 15px',
  width: '100%',
  ...flexHelper('space-between'),
});

const ActionsColumn = styled.div({
  paddingTop: 15,
  ...flexHelper('flex-start', 'flex-start', 'column'),
  gap: 16,
});

type BattlePanelProps = {
  currentStage: Stage;
  currentRound: number;
  setCurrentRound: Dispatch<SetStateAction<number>>;
  setCurrentStage: (stage: Stage) => void;
};

export const BattlePanel = ({ currentStage, currentRound, setCurrentStage, setCurrentRound }: BattlePanelProps) => {
  const [hitPoints, setHitPoints] = useState({ player: 5, bot: 5 });
  const [playerActions, setPlayerActions] = useState<SelectedActions>({ attack: undefined, block: undefined });
  const [isAttackSubmitted, setIsAttackSubmitted] = useState(false);
  const [battleLog, setBattleLog] = useState<BattleLogItem[]>([]);

  const handleChooseAction = (actionType: 'attack' | 'block', item: HeroBodyPart) => {
    setPlayerActions((prev) => ({ ...prev, [actionType]: item }));
  };

  const goToNextRound = useCallback(async () => {
    setCurrentStage('round');
    setCurrentRound((prev) => prev + 1);
    await sleep(2000);
    setCurrentStage('fight');
    setPlayerActions({ attack: undefined, block: undefined });
    setIsAttackSubmitted(false);
  }, [setCurrentRound, setCurrentStage]);

  const handleAttack = async () => {
    setIsAttackSubmitted(true);
    const botAttack = heroBodyParts[Math.floor(Math.random() * 3)];
    const botBlock = heroBodyParts[Math.floor(Math.random() * 3)];

    let playerHitPoints = hitPoints.player;
    let botHitPoints = hitPoints.bot;
    if (playerActions.attack !== botBlock) {
      botHitPoints -= 1;
    }
    if (botAttack !== playerActions.block) {
      playerHitPoints -= 1;
    }
    setBattleLog((prev) => [
      ...prev,
      {
        attackedByPlayerBodyPart: playerActions.attack!,
        attackedByBotBodyPart: botAttack,
        isAttackSuccess: botHitPoints < hitPoints.bot,
        isBlockSuccess: playerHitPoints === hitPoints.player,
      },
    ]);
    setHitPoints({ player: playerHitPoints, bot: botHitPoints });

    await sleep(3000);
    if (playerHitPoints === 0 || botHitPoints === 0) {
      setCurrentStage('final');
    } else {
      await goToNextRound();
    }
  };

  return (
    <ArenaRow>
      <HeroBlock
        healthPoints={hitPoints.player}
        isPlayer
        isHidden={currentStage === 'final' && hitPoints.player === 0}
      />
      <RoundTitle variant="h1" color="white" textAlign="center" isRoundStage={currentStage === 'round'}>
        Round {currentRound}
      </RoundTitle>
      <BattleMainBlock isFightStage={currentStage === 'fight'}>
        <RoundHeader>
          <Text color="white">Round {currentRound}</Text>
        </RoundHeader>
        <ActionsHeader>
          <Text variant="label" color="white">
            1. Attack
          </Text>
          <Text variant="label" color="white">
            2. Block
          </Text>
        </ActionsHeader>
        <Icon type="line-horizontal" width={532} height={10} sx={{ marginTop: 10 }} />
        <ActionsRow>
          <ActionsColumn>
            {heroBodyParts.map((item) => (
              <ActionTab
                key={item}
                direction="left"
                active={playerActions.attack === item}
                actionType="attack"
                actionOpponentItem={item}
                onSelect={() => handleChooseAction('attack', item)}
                disabled={currentStage !== 'fight' || isAttackSubmitted}
              />
            ))}
          </ActionsColumn>
          <Icon type="line-vertical" width={9} height={229} sx={{ marginTop: -5 }} />
          <ActionsColumn>
            {heroBodyParts.map((item) => (
              <ActionTab
                key={item}
                direction="right"
                active={playerActions.block === item}
                actionType="block"
                actionOpponentItem={item}
                onSelect={() => handleChooseAction('block', item)}
                disabled={currentStage !== 'fight' || isAttackSubmitted}
              />
            ))}
          </ActionsColumn>
        </ActionsRow>
        <Button
          variant="tertiary"
          color="black"
          text="attack"
          disabled={!playerActions.attack || !playerActions.block || isAttackSubmitted}
          onClick={handleAttack}
          sx={{ margin: '30px auto 16px' }}
        />
        <BattleLog battleLog={battleLog} isFightStage={currentStage === 'fight'} />
      </BattleMainBlock>
      <FinalBlock isFinalStage={currentStage === 'final'} healthPoints={hitPoints} />
      <HeroBlock
        isPlayer={false}
        healthPoints={hitPoints.bot}
        isHidden={currentStage === 'final' && hitPoints.bot === 0}
      />
    </ArenaRow>
  );
};
