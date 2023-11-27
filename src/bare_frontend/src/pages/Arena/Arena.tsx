import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';

import { arenaBackground, mainLogo } from '../../assets/images';
import { Header, routes } from '../../containers';
import { useStore } from '../../hooks';
import { PageWrapper, TRANSITION_DEFAULT } from '../../styles';
import { sleep } from '../../utils';

import { Stage } from './Arena.mocked';
import { BattlePanel, StartLayer } from './sections';

const LogoImage = styled.img<{ isFightStage: boolean }>(
  {
    position: 'relative',
    zIndex: 20,
    height: 97,
    transition: TRANSITION_DEFAULT,
  },
  ({ isFightStage }) => ({
    top: isFightStage ? 0 : 24,
  }),
);

export const Arena = () => {
  const navigate = useNavigate();
  const { logout, togglePageLoader } = useStore();
  const [currentRound, setCurrentRound] = useState(1);
  const [currentStage, setCurrentStage] = useState<Stage>('none');

  const handleLogout = useCallback(async () => {
    await logout();
    navigate(routes.home.root);
  }, [logout, navigate]);

  const initArena = useCallback(async () => {
    togglePageLoader();
    await sleep(4000);
    togglePageLoader();
    setCurrentStage('start');
    await sleep(2000);
    setCurrentStage('round');
    await sleep(4000);
    setCurrentStage('fight');
  }, [togglePageLoader]);

  useEffect(() => {
    initArena();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper bgImage={arenaBackground} isFillGradient={currentStage === 'fight'} css={{ position: 'fixed' }}>
      <StartLayer isShown={currentStage === 'start'} />
      {currentStage === 'fight' && <Header onLogout={handleLogout} />}
      <LogoImage src={mainLogo} alt="sekuya logo" isFightStage={currentStage === 'fight' || currentRound > 1} />
      <BattlePanel
        currentStage={currentStage}
        currentRound={currentRound}
        setCurrentStage={setCurrentStage}
        setCurrentRound={setCurrentRound}
      />
    </PageWrapper>
  );
};
