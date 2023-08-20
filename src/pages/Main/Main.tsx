import { Box, Typography } from '@mui/material';
import maestroUrl from '../../assets/images/maestro.png';
import './styles.scss';

export const Main: React.FC = (): JSX.Element => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <h2 className="welcome-title">Welcome to Maestro!</h2>
        <Typography variant="subtitle1">Oline market, where melodies come alive</Typography>
        <div className="maestro-container">
          <img className="maestro" src={maestroUrl} alt="maestro on treble clef" />
        </div>

        <Typography className="welcome-subtitle" variant="subtitle2">
          Find your perfect instrument in a world of musical possibilities
        </Typography>
      </Box>
    </>
  );
};
