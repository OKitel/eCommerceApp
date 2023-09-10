import { Box, Typography, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import maestroUrl from '../../assets/images/maestro.png';

import './styles.scss';

export const Main: React.FC = (): JSX.Element => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <h2 className="welcome-title">Welcome to Maestro!</h2>
        <Typography variant="subtitle1">Online market, where melodies come alive</Typography>
        <div className="maestro-container">
          <img className="maestro" src={maestroUrl} alt="maestro on treble clef" />
        </div>

        <Typography className="welcome-subtitle" variant="subtitle2">
          Find your perfect instrument in a world of musical possibilities
        </Typography>

        <Paper elevation={3} sx={{ maxWidth: '60%', padding: '1rem', mt: 2, mb: 2 }}>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>
            Dear cross-checker!
          </Typography>
          <Typography variant="subtitle2">
            While we strive to provide multiple images for all our products, there are instances where only a single
            image is available. To help you efficiently cross-check our online market, we have provided direct links to
            products with multiple images below:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            <Button
              component={RouterLink}
              variant="text"
              to={'/product/ee4cf3a8-1a70-44e1-8837-e0e46e7ce026/yamaha-m3'}
            >
              Yamaha M3 Piano acoustic
            </Button>
            <Button component={RouterLink} variant="text" to={'/product/a682d02e-4512-4808-9448-4fd24c48f8c1/trbx-174'}>
              Yamaha TRBX174 Bass
            </Button>

            <Button
              component={RouterLink}
              variant="text"
              to={'/product/f657f92c-ae97-4a87-8a20-2434908b9a13/kaimana-uk-21'}
            >
              Kaimana UK-21 Ukulele
            </Button>
            <Button
              component={RouterLink}
              variant="text"
              to={'/product/1bac2cfc-33e5-4a42-856c-79588e82b627/yamaha-p-115'}
            >
              Yamaha P-115 Piano
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
