import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Typography } from '@mui/material';
import './styles.scss';

type Props = {
  images: { url: string }[] | undefined;
};

export const MiniSwiper: React.FC<Props> = ({ images }: Props): React.ReactElement => {
  return (
    <>
      <SwiperReact
        loop
        modules={[Navigation, FreeMode, Pagination]}
        spaceBetween={50}
        pagination
        navigation
        className="main-swiper"
      >
        {!images && <Typography variant="h3">No image found</Typography>}
        {images &&
          images.map((image) => {
            return (
              <SwiperSlide key={image.url}>
                <img id="mini-swiper_image" src={image.url} alt="product image" />
              </SwiperSlide>
            );
          })}
      </SwiperReact>
    </>
  );
};
