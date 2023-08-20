import { Box } from '@mui/material';
import './styles.scss';

export const Main: React.FC = (): JSX.Element => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <h2>Welcome to Maestro!</h2>
        <p>Oline market, where melodies come alive</p>
      </Box>
    </>
  );
};
