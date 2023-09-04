import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { Swiper } from 'swiper/types';
import './styles.scss';
import { ImageModal } from '../ImageModal/ImageModal';

type Props = {
  images: { url: string }[] | undefined;
};

export const SwiperComponent: React.FC<Props> = ({ images }: Props): React.ReactElement => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const [clickedImage, setClickedImage] = useState<string>('');
  const [openImageModal, setOpenImageModal] = useState(false);
  return (
    <>
      <Paper className="swiper-container" elevation={3}>
        <SwiperReact
          loop
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Thumbs, FreeMode]}
          spaceBetween={50}
          navigation
          className="main-swiper"
        >
          {!images && <Typography variant="h3">No image found</Typography>}
          {images &&
            images.map((image) => {
              return (
                <SwiperSlide key={image.url}>
                  <img
                    id="main-swiper_image"
                    src={image.url}
                    alt="product image"
                    onClick={(): void => {
                      setClickedImage(image.url);
                      setOpenImageModal(true);
                    }}
                  />
                </SwiperSlide>
              );
            })}
        </SwiperReact>
        <SwiperReact
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbs-swiper"
        >
          {images &&
            images.map((image) => {
              return (
                <SwiperSlide key={image.url}>
                  <img id="thumbs-swiper_image" src={image.url} alt="product image thumb" />
                </SwiperSlide>
              );
            })}
        </SwiperReact>
      </Paper>
      <ImageModal imageUrl={clickedImage} open={openImageModal} setOpen={(open): void => setOpenImageModal(open)} />
    </>
  );
};
