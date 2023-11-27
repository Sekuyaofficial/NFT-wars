import { footerLogo } from '../../assets/images';
import { FontFamily, Text } from '../../components';
import { GradientSpinner } from '../../components/Spinner/GradientSpinner';
import { COLOR_MAASTRICHT_BLUE } from '../../styles';

export const Loader = () => {
  return (
    <div
      css={{
        width: '100vw',
        height: '100vh',
        padding: 18,
      }}
    >
      <div
        css={{
          background: COLOR_MAASTRICHT_BLUE,
          borderRadius: 24,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div css={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 35 }}>
          <GradientSpinner sx={{ marginTop: 'auto' }} />
          <Text
            color="white"
            family={FontFamily.HammersmithOne}
            cssProps={{
              fontSize: '48px',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            Loading...
          </Text>
        </div>

        <img
          src={footerLogo}
          alt="Sekuya Saga"
          css={{ width: 176, height: 84, marginTop: 'auto', paddingBottom: 16 }}
        />
      </div>
    </div>
  );
};
