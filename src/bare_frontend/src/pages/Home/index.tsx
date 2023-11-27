import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';

import { mainBackground, mainLogo } from '../../assets/images';
import { Button, Icon, Text } from '../../components';
import { Header, HeroSelector, routes } from '../../containers';
import { useStore } from '../../hooks';
import { PageWrapper, TRANSITION_DEFAULT } from '../../styles';
import { sleep } from '../../utils';

import { HomeFooter } from './sections';

const LogoImage = styled.img({
  minHeight: 100,
  maxHeight: 188,
  height: 'auto',
});

export const Home = () => {
  const { login, logout, isAuthenticated } = useStore();
  const navigate = useNavigate();
  const [selectedHero, setSelectedHero] = useState<number>();

  const handleLogin = useCallback(async () => {
    await login();
  }, [login]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleNavigateToArena = useCallback(() => {
    navigate(routes.arena.root, { state: { heroId: selectedHero } });
  }, [navigate, selectedHero]);

  return (
    <PageWrapper bgImage={mainBackground}>
      {isAuthenticated && <Header onLogout={handleLogout} />}
      <LogoImage src={mainLogo} />
      <Text
        variant="h2"
        color="white"
        textAlign="center"
        css={{ marginTop: isAuthenticated ? 0 : '60px', width: 600, transition: TRANSITION_DEFAULT }}
      >
        Choose your favorite hero Win the rewards!
      </Text>
      {isAuthenticated ? (
        <>
          <HeroSelector selectedHero={selectedHero} onSelect={(id) => setSelectedHero(id)} />
          <Button
            variant="secondary"
            size="lg"
            text="Start game"
            disabled={!selectedHero}
            iconImg={<Icon type="arrow-right" color="white" width={17} height={13} />}
            onClick={handleNavigateToArena}
          />
        </>
      ) : (
        <Button
          variant="secondary"
          size="lg"
          text="Login and start"
          iconImg={<Icon type="arrow-right" color="white" width={17} height={13} />}
          onClick={handleLogin}
          sx={{ paddingLeft: '25px', paddingRight: '71px' }}
        />
      )}
      <HomeFooter />
    </PageWrapper>
  );
};
