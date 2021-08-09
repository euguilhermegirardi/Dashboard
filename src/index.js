import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';
import {AppProviders} from './context'
import {useStorage} from './hooks/useStorage'
import * as themes from './theme/schema.json'

const Index = () => {
  const {setToLS} = useStorage()
  setToLS('all-themes', themes.default)
  return <App />
}

ReactDOM.render(
  <AppProviders>
    <Index />
  </AppProviders>,
  document.getElementById('root')
);
