import { AppStore, wrapper, makeStore } from '@/redux/store';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import i18n from '@/config/i18next';
import { I18nextProvider } from 'react-i18next';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialState?: Record<string, unknown>;
  mockRouter?: NextRouter;
  store?: AppStore;
}

function renderWithProviders(
  ui: React.ReactElement,
  { initialState = {}, store = makeStore(), mockRouter, ...renderOptions }: ExtendedRenderOptions = {},
) {
  let routerValue = mockRouter;
  if (!routerValue) {
    routerValue = {
      ...require('@/base/__tests__/mock/route.json'),
      push: jest.fn(),
      prefetch: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  }

  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    let storeData = store;
    if (!storeData) {
      const storeWrapper = wrapper.useWrappedStore({ initialState });
      storeData = storeWrapper.store;
    }

    return (
      <Provider store={storeData}>
        <I18nextProvider i18n={i18n}>
          <RouterContext.Provider value={routerValue as NextRouter}>{children}</RouterContext.Provider>
        </I18nextProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { renderWithProviders };
