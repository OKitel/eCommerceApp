import { Modal as MuiModal, Box, Typography } from '@mui/material';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Modal: React.FC<Props> = ({ open, setOpen }: Props): React.ReactElement => {
  const handleClose = (): void => setOpen(false);
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Modal title
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          children for different actions
        </Typography>
      </Box>
    </MuiModal>
  );
};
