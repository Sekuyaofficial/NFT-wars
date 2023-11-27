import { Theme } from '@emotion/react';

import spinnerSrc from './gradient-spinner.png';
import { Loader } from './Spinner';

export type GradientSpinnerProps = {
  sx?: Theme;
};

export const GradientSpinner = ({ sx }: GradientSpinnerProps) => {
  return <Loader width={113} height={113} src={spinnerSrc} style={{ ...sx }} />;
};
