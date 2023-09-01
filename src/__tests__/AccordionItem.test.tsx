import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccordionItem } from '../components/AddressesAccordion/AccordionItem';
import { renderWithProviders } from './test-utils';

describe('AccordionItem', () => {
  const mockAddress = {
    id: 'address123',
    streetName: '123 Main Street',
    country: 'US',
  };
  const user = userEvent.setup();

  it('renders address information correctly', () => {
    const defaultId = 'address123';
    renderWithProviders(
      <AccordionItem
        defaultId={defaultId}
        address={mockAddress}
        onDeleteRequested={jest.fn()}
        onDefaultChange={jest.fn()}
        onEditRequest={jest.fn()}
      />,
    );

    expect(screen.getByText(mockAddress.streetName)).toBeInTheDocument();
  });

  it('renders default chip for default address', () => {
    const defaultId = 'address123';
    renderWithProviders(
      <AccordionItem
        defaultId={defaultId}
        address={mockAddress}
        onDeleteRequested={jest.fn()}
        onDefaultChange={jest.fn()}
        onEditRequest={jest.fn()}
      />,
    );

    expect(screen.getByTestId('chip-default-address')).toBeInTheDocument();
  });

  it('calls onEditRequest when edit button is clicked', async () => {
    const onEditRequestMock = jest.fn();
    renderWithProviders(
      <AccordionItem
        defaultId="someDefaultId"
        address={mockAddress}
        onDeleteRequested={jest.fn()}
        onDefaultChange={jest.fn()}
        onEditRequest={onEditRequestMock}
      />,
    );

    const editButton = screen.getByTestId('edit-btn');
    await user.click(editButton);

    expect(onEditRequestMock).toHaveBeenCalled();
  });

  it('calls onDeleteRequested when delete button is clicked', async () => {
    const onDeleteRequestedMock = jest.fn();
    renderWithProviders(
      <AccordionItem
        defaultId="someDefaultId"
        address={mockAddress}
        onDeleteRequested={onDeleteRequestedMock}
        onDefaultChange={jest.fn()}
        onEditRequest={jest.fn()}
      />,
    );

    const deleteButton = screen.getByTestId('delete-btn');
    await user.click(deleteButton);

    expect(onDeleteRequestedMock).toHaveBeenCalled();
  });
});
