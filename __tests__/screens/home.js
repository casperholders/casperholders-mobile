import LoginScreen from '@/screens/LoginScreen';

import store from '@/store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

describe('<App />', () => {

  it('has 1 child', async () => {

    const component = (
      <Provider store={store}>
        <PaperProvider>
          <BottomSheetModalProvider>
            <LoginScreen />
          </BottomSheetModalProvider>
        </PaperProvider>
      </Provider>
    );
    const { debug, findByText } = render(component);
    debug();
    const local = await findByText('Connect locally');
    expect(local).toBeTruthy();
  });
});