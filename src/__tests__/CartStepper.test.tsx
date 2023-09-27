import { render } from '@testing-library/react';

import { CartStepper } from '../components/CartStepper/CartStepper';

describe('CartStepper', () => {
  it('renders the component without errors', () => {
    const { container } = render(<CartStepper />);
    expect(container).toBeInTheDocument();
  });

  it('displays the step labels correctly', () => {
    const { getByText } = render(<CartStepper />);
    expect(getByText('Your cart')).toBeInTheDocument();
    expect(getByText('Delivery and payment')).toBeInTheDocument();
    expect(getByText('Done')).toBeInTheDocument();
  });
});
