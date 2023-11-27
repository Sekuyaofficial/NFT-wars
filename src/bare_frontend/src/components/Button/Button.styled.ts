import styled, { CSSObject } from '@emotion/styled';

import {
  BORDER_RADIUS_FULL,
  COLOR_BUTTON_PRIMARY,
  COLOR_BUTTON_SECONDARY,
  COLOR_BUTTON_TERTIARY,
  COLOR_ICON_BUTTON,
  COLOR_ICON_BUTTON_HOVER,
  TRANSITION_DEFAULT,
} from '../../styles';
import { flexHelper } from '../../utils';

import { ButtonProps } from './Button';

export const ButtonStyled = styled('button')<{
  variant: ButtonProps['variant'];
  size?: ButtonProps['size'];
  disabled?: boolean;
}>(
  {
    position: 'relative',
    ...flexHelper('center', 'center'),
    svg: {
      position: 'absolute',
      transition: TRANSITION_DEFAULT,
    },
  },
  ({ variant, size = 'md', disabled }) => {
    const styleObject = () => {
      if (variant === 'primary') {
        return {
          background: COLOR_BUTTON_PRIMARY,
          clipPath: 'polygon(100% 0%, 100% 100%, 15% 100%, 0% 65%, 0% 0%)',
          svg: {
            right: 30,
          },
          '&:hover': disabled
            ? undefined
            : {
                svg: {
                  right: 20,
                },
              },
        };
      }
      if (variant === 'secondary') {
        return {
          background: COLOR_BUTTON_SECONDARY,
          opacity: disabled ? 0.6 : 1,
          clipPath: 'polygon(100% 0%, 100% 65%, 92% 100%, 0% 100%, 0% 0%)',
          svg: {
            right: 43,
          },
          '&:hover': disabled
            ? undefined
            : {
                svg: {
                  right: 30,
                },
              },
        };
      }
      if (variant === 'rect') {
        return {
          background: COLOR_BUTTON_SECONDARY,
          opacity: disabled ? 0.6 : 1,
          clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)',
          svg: {
            right: 43,
          },
          '&:hover': disabled
            ? undefined
            : {
                svg: {
                  right: 30,
                },
              },
        };
      }
      if (variant === 'icon') {
        return {
          background: COLOR_ICON_BUTTON,
          borderRadius: BORDER_RADIUS_FULL,
          svg: {
            position: 'relative',
          } as CSSObject,
        };
      }
      return {
        width: 186,
        height: 56,
        clipPath: 'polygon(100% 0, 100% 100%, 21px 100%, 0 39px, 0 0)',
        background: COLOR_BUTTON_TERTIARY,
        opacity: disabled ? 0.5 : 1,
      };
    };

    if (size === 'sm') {
      return {
        ...styleObject(),
        height: 32,
        padding: 8,
        p: {
          fontSize: '14px',
          lineHeight: '16px',
        },
      };
    }

    if (size === 'lg') {
      return {
        ...styleObject(),
        height: 67,
        padding: '23px 87px 24px 58px',
      };
    }

    return {
      ...styleObject(),
      height: 56,
      padding: '16px 30px 16px 42px',
    };
  },
);

export const LinkButton = styled.a({
  width: 56,
  height: 56,
  background: COLOR_ICON_BUTTON,
  borderRadius: BORDER_RADIUS_FULL,
  padding: '16px',
  transition: TRANSITION_DEFAULT,
  ...flexHelper('center', 'center'),
  '&:hover': {
    background: COLOR_ICON_BUTTON_HOVER,
  },
});
