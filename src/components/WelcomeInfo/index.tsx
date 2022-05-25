import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import welcomeImg from '../../assets/img/welcome.png';
import { MainWelcomeContent, Wave } from './styled';
import { COLORS } from '../../constants';

export const WelcomeInfo = () => {
  const { t } = useTranslation(['common']);

  return (
    <Box
      sx={{
        maxWidth: 1920,
        maxHeight: 760,
      }}
    >
      <MainWelcomeContent>
        <Box
          sx={{
            maxWidth: 700,
            maxHeight: 800,
            paddingLeft: '34px',
            paddingRight: '34px',
          }}
        >
          <Typography
            sx={{
              fontSize: '24px',
              textTransform: 'uppercase',
              color: COLORS.GRAY.normal,
            }}
          >
            {t('Welcome')}
          </Typography>
          <Typography
            sx={{
              fontSize: '56px',
              fontWeight: '700',
              lineHeight: 1,
              marginBottom: '16px',
              color: COLORS.MAIN.light,
            }}
          >
            Reactive Area App
          </Typography>
          <Typography sx={{ fontSize: '18px', color: COLORS.GRAY.normal }}>
            {t('AppDescription')}
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{
            maxHeight: 630,
            maxWidth: 820,
            marginTop: 8,
          }}
        >
          <Box
            component="img"
            sx={{
              height: '100%',
              width: '100%',
            }}
            alt="welcome image"
            src={welcomeImg}
          />
        </Box>
      </MainWelcomeContent>
      <Wave />
    </Box>
  );
};
