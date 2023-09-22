import { render, screen } from '@testing-library/react';

import { AboutUs } from '../pages/AboutUs/AboutUs';

describe('Test AboutUs page', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('renders the AboutUs component', () => {
    render(<AboutUs />);

    const titleElement = screen.getByText('The Creative Minds Behind Maestro Market');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays developer information correctly', () => {
    render(<AboutUs />);

    const olgaName = screen.getByText('Olga Kitel');
    const artemName = screen.getByText('Artem Lobovskiy');

    expect(olgaName).toBeInTheDocument();
    expect(artemName).toBeInTheDocument();

    const olgaDescription = screen.getByText(/Dedicated front-end developer/i);
    const artemDescription = screen.getByText(/Graduated from university with an engineer degree/i);

    expect(olgaDescription).toBeInTheDocument();
    expect(artemDescription).toBeInTheDocument();
  });

  it('opens social media links in a new tab with the correct rel attribute', () => {
    render(<AboutUs />);

    const devGitHubLink = screen.getByTestId('dev-github-link');
    const devLinkedInLink = screen.getByTestId('dev-linkedin-link');

    expect(devGitHubLink).toHaveAttribute('target', '_blank');
    expect(devLinkedInLink).toHaveAttribute('target', '_blank');

    expect(devGitHubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(devLinkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays the Rolling Scopes School logo with a link', () => {
    render(<AboutUs />);

    const rsLogo = screen.getByAltText('The Rolling Scopes School Logo');
    expect(rsLogo).toBeInTheDocument();

    const rsLogoLink = screen.getByRole('link', { name: /The Rolling Scopes School Logo/i });
    expect(rsLogoLink).toHaveAttribute('href', 'https://rs.school/');
  });
});
