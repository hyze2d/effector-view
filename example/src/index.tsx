import React from 'react';
import ReactDOM from 'react-dom/client';
import { createView } from 'effector-view';
import { Input } from './input';
import { createEvent, createStore } from 'effector';

const $email = createStore('');
const emailChanged = createEvent<string>();

const Email = createView(Input)
  .props({
    value: $email,
    onChange: emailChanged
  })
  .view();

const App = () => {
  return (
    <div>
      <Email tooltip='test' label='Email' />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
