import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageModal } from '../components/ImageModal/ImageModal';
import { renderWithProviders } from './test-utils';

// mock swiper component to fix https://alobovskiy-1691010266635.atlassian.net/browse/ECA-150
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactElement }): JSX.Element => <div>{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactElement }): JSX.Element => <div>{children}</div>,
}));

describe('ImageModal', () => {
  const images = [{ url: 'image1.jpg' }, { url: 'image2.jpg' }];
  const setOpen = jest.fn();
  const user = userEvent.setup();

  it('renders without errors', () => {
    renderWithProviders(<ImageModal images={images} imageUrl={images[0].url} open={true} setOpen={setOpen} />);
    const modal = screen.getByTestId('image-modal');
    expect(modal).toBeInTheDocument();
  });

  it('calls setOpen with false when close button is clicked', async () => {
    renderWithProviders(<ImageModal images={images} imageUrl={images[0].url} open={true} setOpen={setOpen} />);
    const closeButton = screen.getByTestId('close-button');

    await user.click(closeButton);

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
