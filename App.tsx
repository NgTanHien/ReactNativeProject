import React from 'react';
import { Provider } from 'react-redux';
import DrawerNavigator from './THBuoi2/contact-list/routes';
import Store from './THBuoi2/screens/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;
