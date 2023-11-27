import { ButtonHTMLAttributes, FC, ReactElement } from 'react';
import { Theme } from '@emotion/react';

import { Spinner } from '../Spinner';
import { Text, TextColors, TextVariants } from '../Text';

import { ButtonStyled, LinkButton } from './Button.styled';

export type ButtonProps = {
  type?: ButtonHTMLAttributes<any>['type'];
  variant: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'rect';
  textVariant?: TextVariants;
  color?: TextColors;
  onClick?: (event: any) => void;
  iconImg?: ReactElement;
  loading?: boolean;
  size?: 'lg' | 'md' | 'sm';
  href?: string;
  disabled?: boolean;
  text?: string | ReactElement;
  sx?: Theme;
};

export const Button: FC<ButtonProps> = ({
  type = 'button',
  iconImg,
  href,
  size,
  disabled = false,
  variant,
  textVariant = 'button',
  color = 'white',
  loading,
  onClick,
  text,
  sx,
}) => {
  if (href) {
    return (
      <LinkButton href={href} target="_blank" rel="noreferrer" css={{ ...sx }}>
        {text && (
          <Text variant="subtitle2" color="black">
            {text}
          </Text>
        )}
        {iconImg && iconImg}
      </LinkButton>
    );
  }

  return (
    <ButtonStyled disabled={disabled} variant={variant} size={size} type={type} onClick={onClick} css={{ ...sx }}>
      {loading ? (
        <Spinner sx={{ width: 30, height: 30 }} />
      ) : (
        <>
          {text && (
            <Text variant={textVariant} color={color} css={{ opacity: disabled ? 0.6 : 1 }}>
              {text}
            </Text>
          )}

          {iconImg && iconImg}
        </>
      )}
    </ButtonStyled>
  );
};
