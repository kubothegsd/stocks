import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { setupServer } from 'msw/node';
import { configureAppStore } from '../store';
import type { AppStore, RootState } from '../store';
import theme from '../theme';
import {
  handlers,
  dataResponse,
  emptyResponse,
  errorResponse,
} from '../mocks/handlers';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const customRender = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureAppStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
    return (
      <React.Fragment>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Provider store={store}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </Provider>
      </React.Fragment>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from '@testing-library/react';
export { customRender as render };

export const setUpMockServer = () => {
  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => {
    server.close();
  });

  return {
    server,
    dataResponse,
    emptyResponse,
    errorResponse,
  };
};
