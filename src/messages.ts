export const messages = {
  registration: {
    welcome: 'Your account was successfully created! Welcome!',
    error: (reason: string): string => `Oops! Registration failed. ${reason}`,
  },

  deleteConfirmation: {
    title: 'Delete Address?',
    description: 'Are you sure you want to delete this address?',
    delete: 'Delete',
    cancel: 'Cancel',
  },
};
