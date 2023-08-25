import { Box, CircularProgress } from '@mui/material';

export const ProgressLoader: React.FC = (): React.ReactElement => (
  <Box textAlign={'center'}>
    <CircularProgress />
  </Box>
);
