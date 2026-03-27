// import './index.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import "@atlaskit/css-reset";

import {EditorContext} from '@atlaskit/editor-core/editor-context';
import App from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <EditorContext>
            <App/>
        </EditorContext>
    </StrictMode>,
)
