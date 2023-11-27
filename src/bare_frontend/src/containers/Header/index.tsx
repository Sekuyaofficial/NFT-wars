import { useCallback, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useMatch } from 'react-router';
import styled from '@emotion/styled';

import { Button, Icon, PointsBlock } from '../../components';
import { useStore } from '../../hooks';
import { flexHelper, shortenPhrase, sleep } from '../../utils';
import { routes } from '../Router';

const HeaderWrapper = styled.div({
  position: 'absolute',
  top: 0,
  zIndex: 20,
  padding: '24px',
  width: '100%',
  ...flexHelper('space-between', 'flex-start'),
});

type HeaderProps = {
  onLogout: () => void;
};

export const Header = ({ onLogout }: HeaderProps) => {
  const isHomePage = useMatch(routes.home.root);
  const { principal } = useStore();
  const [copyButtonText, setCopyButtonText] = useState(shortenPhrase(principal.toText(), 5, 5));

  const handleCopy = useCallback(async () => {
    setCopyButtonText('COPIED');
    await sleep(2000);
    setCopyButtonText(shortenPhrase(principal.toText(), 5, 5));
  }, [principal]);

  return (
    <HeaderWrapper>
      <PointsBlock amount={1000} isHidden={!isHomePage} />
      <div css={{ display: 'flex', gap: 8 }}>
        <CopyToClipboard text={principal.toText()} onCopy={handleCopy}>
          <Button
            variant="primary"
            textVariant="body"
            color="black"
            text={
              <div css={{ display: 'flex', gap: 16, svg: { position: 'initial' } }}>
                <div>{copyButtonText}</div>
                <Icon type="copy" />
              </div>
            }
            sx={{ minWidth: '270px' }}
          />
        </CopyToClipboard>
        <Button
          variant="rect"
          textVariant="body"
          color="black"
          text={<Icon type="logout" sx={{ position: 'initial' }} />}
          sx={{ padding: 16 }}
          onClick={onLogout}
        />
      </div>
    </HeaderWrapper>
  );
};
