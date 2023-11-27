import styled from '@emotion/styled';

import { flexHelper } from '../utils';

import { BORDER_RADIUS_M } from './common';

export const PageWrapper = styled.div<{ bgImage: string; isFillGradient?: boolean }>(
  {
    position: 'relative',
    padding: '24px',
    width: 'calc(100vw - 36px)',
    height: 'calc(100vh - 36px)',
    borderRadius: BORDER_RADIUS_M,
    ...flexHelper('flex-start', 'center', 'column'),
    gap: '41px',
    // transition: TRANSITION_DEFAULT,
  },
  ({ bgImage, isFillGradient }) => ({
    background: isFillGradient
      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${bgImage}) no-repeat center / cover`
      : `center / cover no-repeat url(${bgImage})`,
  }),
);
