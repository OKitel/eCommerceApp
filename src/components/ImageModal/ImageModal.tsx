import { Modal, Box, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useCallback } from 'react';
import './styles.scss';
import { MiniSwiper } from '../Swiper/MiniSwiper';

type Props = {
  images: { url: string }[] | undefined;
  imageUrl: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ImageModal: React.FC<Props> = ({ images, imageUrl, open, setOpen }: Props): React.ReactElement => {
  const handleClose = useCallback((): void => setOpen(false), [setOpen]);

  return (
    <Modal open={open} onClose={handleClose} data-testid="image-modal">
      <Box className="image-modal_container">
        <Box className="image-modal_btn">
          <IconButton onClick={handleClose} data-testid="close-button">
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box className="img-container">
          <MiniSwiper images={images} imageUrl={imageUrl} />
        </Box>
      </Box>
    </Modal>
  );
};
