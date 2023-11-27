import { ReactElement } from 'react';

import { Icon } from '../../../../components';

type SocialLink = {
  logo: ReactElement;
  link: string;
};

export const socialLinks: SocialLink[] = [
  {
    logo: <Icon type="twitter" width={25} height={25} />,
    link: 'https://twitter.com/sekuyaofficial',
  },
  {
    logo: <Icon type="telegram" width={32} height={32} />,
    link: 'https://t.me/sekuyaofficial',
  },
  {
    logo: <Icon type="website" width={32} height={32} />,
    link: 'https://sekuya.io',
  },
  {
    logo: <Icon type="instagram" width={32} height={32} />,
    link: 'https://instagram.com/sekuyaofficial',
  },
];
