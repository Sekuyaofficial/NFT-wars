type JustifyContent =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'stretch';

type AlignItems = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
type FlexDirection = 'column' | 'row' | 'column-reverse' | 'row-reverse';

export const flexHelper = (
  justifyContent: JustifyContent = 'flex-start',
  alignItems: AlignItems = 'flex-start',
  flexDirection: FlexDirection = 'row',
) => ({
  display: 'flex',
  justifyContent,
  alignItems,
  flexDirection,
});
