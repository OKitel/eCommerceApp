import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { Provider } from 'react-redux';

import { store } from '../store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {}

export const renderWithProviders = (
  ui: React.ReactElement,
  renderOptions: ExtendedRenderOptions = {},
): RenderResult => {
  setupListeners(store.dispatch);

  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
