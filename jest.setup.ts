import 'whatwg-fetch';
import '@testing-library/jest-dom';

// mock swiper modules to fix https://alobovskiy-1691010266635.atlassian.net/browse/ECA-150
jest.mock('swiper/modules', () => ({
  default: jest.fn(),
  Navigation: jest.fn(),
  Thumbs: jest.fn(),
  FreeMode: jest.fn(),
}));
