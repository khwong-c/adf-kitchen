import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { EditorContext } from '@atlaskit/editor-core';

ReactDOM.render(
    <EditorContext>
        <App />
    </EditorContext>,
  document.getElementById('app')
);
