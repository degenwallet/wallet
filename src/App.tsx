import * as React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from '@degenwallet/store';
import {AppStackParamList, Main} from './features/main/screens/Main';
import {PersistGate} from 'redux-persist/integration/react';

const App: React.FC<AppStackParamList> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
