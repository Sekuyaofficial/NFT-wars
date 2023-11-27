import { createRoot } from 'react-dom/client';

import '@fontsource/hammersmith-one';

import { App } from './src/App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
