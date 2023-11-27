import { COLOR_ACCENT, COLOR_BLACK, COLOR_DAMAGE, COLOR_WHITE } from '../../styles';

import { FontFamily, FontWeights } from './Text.types';

export const styles = {
  font: {
    [FontFamily.HammersmithOne]: {
      fontFamily: FontFamily.HammersmithOne,
    },
    [FontFamily.IntegralCF]: {
      fontFamily: FontFamily.IntegralCF,
    },
  },
  h1: {
    fontFamily: FontFamily.IntegralCF,
    fontWeight: FontWeights.Medium,
    fontSize: 66,
    lineHeight: 'normal',
    letterSpacing: '2px',
  },
  h2: {
    fontFamily: FontFamily.HammersmithOne,
    fontWeight: FontWeights.Regular,
    fontSize: 48,
    lineHeight: '49px',
    letterSpacing: '-1px',
  },
  subtitle1: {
    fontFamily: FontFamily.IntegralCF,
    fontWeight: FontWeights.Medium,
    fontSize: 32,
    lineHeight: '28px',
  },
  subtitle2: {
    fontFamily: FontFamily.HammersmithOne,
    fontWeight: FontWeights.Regular,
    fontSize: 24,
    lineHeight: '25px',
  },
  body: {
    paddingBottom: 2,
    fontWeight: FontWeights.Regular,
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '0.48px',
  },
  label: {
    fontFamily: FontFamily.HammersmithOne,
    fontWeight: FontWeights.Regular,
    fontSize: 20,
    lineHeight: '21px',
    letterSpacing: '-0.4px',
  },
  button: {
    fontFamily: FontFamily.IntegralCF,
    fontWeight: FontWeights.Regular,
    fontSize: 18,
    lineHeight: 'normal',
    letterSpacing: '0.529px',
  },
  white: {
    color: COLOR_WHITE,
  },
  black: {
    color: COLOR_BLACK,
  },
  damage: {
    color: COLOR_DAMAGE,
  },
  accent: {
    color: COLOR_ACCENT,
  },
};
