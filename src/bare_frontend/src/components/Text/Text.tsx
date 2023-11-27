import { PropsWithChildren } from 'react';
import { Theme } from '@emotion/react';

import { styles } from './Text.styled';
import { FontFamily, FontWeights, TextColors, TextVariants } from './Text.types';

interface TextProps {
  variant?: TextVariants;
  color?: TextColors;
  fontWeight?: FontWeights;
  family?: FontFamily;
  style?: Theme;
  textAlign?: 'left' | 'right' | 'center';
  cssProps?: Theme;
}

export const Text = ({
  variant = 'body',
  color = 'black',
  family = FontFamily.IntegralCF,
  children,
  textAlign = 'left',
  cssProps,
  ...textProps
}: PropsWithChildren<TextProps>) => {
  return (
    <p
      {...textProps}
      css={{
        ...styles.font[family],
        ...styles[color],
        ...styles[variant],
        textAlign,
        ...cssProps,
      }}
    >
      {children}
    </p>
  );
};
