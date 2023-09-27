import { setFormServerError } from '../utils/setFormServerError';

describe('setFormServerError', () => {
  it('should set server errors for each field', () => {
    const errors = {
      email: 'Email is required',
      password: 'Password must be at least 8 characters',
    };

    const setErrorMock = jest.fn();

    setFormServerError(errors, setErrorMock);

    expect(setErrorMock).toHaveBeenCalledTimes(2);

    expect(setErrorMock).toHaveBeenCalledWith('email', {
      type: 'server',
      message: 'Email is required',
    });

    expect(setErrorMock).toHaveBeenCalledWith('password', {
      type: 'server',
      message: 'Password must be at least 8 characters',
    });
  });

  it('should handle empty error object', () => {
    const errors = {};

    const setErrorMock = jest.fn();

    setFormServerError(errors, setErrorMock);

    expect(setErrorMock).not.toHaveBeenCalled();
  });
});
