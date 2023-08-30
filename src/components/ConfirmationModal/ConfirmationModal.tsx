import { Modal, Typography, Box, Button } from '@mui/material';
import { useCallback } from 'react';
import './styles.scss';

type Props = {
  title: string;
  description: string;
  positiveButton: string;
  negativeButton: string;
  deleteConfirmation?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  onPositiveClick: () => void;
  onNegativeClick: () => void;
};

export const ConfirmationModal: React.FC<Props> = ({
  title,
  description,
  positiveButton,
  negativeButton,
  deleteConfirmation,
  open,
  setOpen,
  onPositiveClick: onDelete,
}: Props): React.ReactElement => {
  const handleClose = useCallback((): void => setOpen(false), [setOpen]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">
        <Typography className="modal-title" variant="h4">
          {title}
        </Typography>
        <Typography variant="h6" className="modal-text">
          {description}
        </Typography>
        <div className="confirmation_controls">
          <Button variant="contained" color="secondary" onClick={handleClose}>
            {negativeButton}
          </Button>
          <Button onClick={onDelete} color={deleteConfirmation ? 'error' : 'primary'} variant="contained">
            {positiveButton}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
