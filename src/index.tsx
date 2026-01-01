import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app';
import { LIMIT } from './const/limit';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App limit={LIMIT} />
  </React.StrictMode>
);
