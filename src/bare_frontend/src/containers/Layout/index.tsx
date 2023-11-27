import { PropsWithChildren, useEffect } from 'react';
import styled from '@emotion/styled';

import { useStore } from '../../hooks';
import { Loader } from '../Loader/Loader';
import { PageLoader } from '../PageLoader/PageLoader';

const LayoutContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: '18px',
  marginLeft: 'auto',
  marginRight: 'auto',
  zIndex: 10,
  borderRadius: '24px',
  overflow: 'hidden',
});

export const Layout = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, shouldDisplayLoader, shouldDisplayPageLoader, togglePageLoader } = useStore();

  useEffect(() => {
    togglePageLoader();
    const hideLoaderTimeoutId = window.setTimeout(() => togglePageLoader(), 2000);
    return () => clearTimeout(hideLoaderTimeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated === null || shouldDisplayLoader) {
    return <Loader />;
  }
  return (
    <LayoutContainer>
      {shouldDisplayPageLoader && <PageLoader />}
      {children}
    </LayoutContainer>
  );
};
