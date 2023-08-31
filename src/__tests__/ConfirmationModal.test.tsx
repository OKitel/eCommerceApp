import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationModal } from '../components/ConfirmationModal/ConfirmationModal';
import { renderWithProviders } from './test-utils';

describe('Delete address confirmation modal', () => {
  const user = userEvent.setup();
  const defaultProps = {
    title: 'Delete Address?',
    description: 'Are you sure?',
    positiveButton: 'Delete',
    negativeButton: 'Cancel',
    open: true,
    setOpen: jest.fn(),
    onPositiveClick: jest.fn(),
    onNegativeClick: jest.fn(),
  };

  it('renders modal title and content', () => {
    renderWithProviders(<ConfirmationModal {...defaultProps} />);

    expect(screen.getByText('Delete Address?')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('calls onClose when negative button is clicked', async () => {
    const setOpenMock = jest.fn();
    renderWithProviders(<ConfirmationModal {...defaultProps} setOpen={setOpenMock} />);

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    await user.click(cancelButton);

    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  it('calls onPositiveClick when positive button is clicked', async () => {
    const onPositiveClickMock = jest.fn();
    renderWithProviders(<ConfirmationModal {...defaultProps} onPositiveClick={onPositiveClickMock} />);

    const confirmButton = screen.getByRole('button', { name: /Delete/i });
    await user.click(confirmButton);

    expect(onPositiveClickMock).toHaveBeenCalledTimes(1);
  });
});
