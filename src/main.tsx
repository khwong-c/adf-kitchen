import {createRoot} from 'react-dom/client'
import "@atlaskit/css-reset";

import {EditorContext} from '@atlaskit/editor-core/editor-context';
import App from './App'

createRoot(document.getElementById('root')!).render(
    <EditorContext>
        <App/>
    </EditorContext>
)
