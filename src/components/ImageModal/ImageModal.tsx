import { Modal, Box, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useCallback } from 'react';
import './styles.scss';

type Props = {
  imageUrl: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ImageModal: React.FC<Props> = ({ imageUrl, open, setOpen }: Props): React.ReactElement => {
  const handleClose = useCallback((): void => setOpen(false), [setOpen]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="image-modal_container">
        <Box className="image-modal_btn">
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box className="img-container">
          <img className="image-modal_img" src={imageUrl} alt="full size product image" />
        </Box>
      </Box>
    </Modal>
  );
};
