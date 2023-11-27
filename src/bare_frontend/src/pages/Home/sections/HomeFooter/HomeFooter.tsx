import styled from '@emotion/styled';

import { footerLogo } from '../../../../assets/images';
import { Button, Icon } from '../../../../components';
import { flexHelper } from '../../../../utils';

import { socialLinks } from './HomeFooter.mock';

const FooterWrapper = styled.div({
  position: 'relative',
  marginTop: 'auto',
  width: '100%',
  ...flexHelper('space-between', 'flex-end'),
});

const SocialLinks = styled.div({
  ...flexHelper('flex-start', 'center'),
  gap: '16px',
});

const FooterLogo = styled.img({
  position: 'absolute',
  left: 'calc(50% - 88px)',
  bottom: -8,
  width: 176,
  height: 84,
});

export const HomeFooter = () => {
  return (
    <FooterWrapper>
      <SocialLinks>
        {socialLinks.map(({ logo, link }, index) => (
          <Button key={`${index + 1}`} variant="icon" size="sm" href={link} iconImg={logo} />
        ))}
      </SocialLinks>
      <FooterLogo src={footerLogo} alt="footer logo" />
      <Button
        variant="primary"
        color="black"
        size="lg"
        text="submit nft collection"
        iconImg={<Icon type="arrow-right" color="black" width={13} height={13} />}
        sx={{
          paddingLeft: '42px',
          paddingRight: '50px',
          clipPath: 'polygon(100% 0%, 100% 100%, 7% 100%, 0% 65%, 0% 0%)',
        }}
      />
    </FooterWrapper>
  );
};
