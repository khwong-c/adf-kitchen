import React from 'react';
import ReactDOM from 'react-dom';
import {EditorContext} from '@atlaskit/editor-core';
import App from './App.tsx';
import './index.css';


ReactDOM.render(
    <EditorContext>
        <App/>
    </EditorContext>,
document.getElementById('root')
)
;
