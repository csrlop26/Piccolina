import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import TimelapseHero from './components/timelapse/TimelapseHero.tsx';
import TimelapseMenu from './components/timelapse/TimelapseMenu.tsx';

import TimelapseStoria from './components/timelapse/TimelapseStoria.tsx';
import TimelapseFull from './components/timelapse/TimelapseFull.tsx';

const root = createRoot(document.getElementById('root')!);

if (window.location.pathname === '/record/full' || window.location.pathname === '/record') {
  root.render(
    <StrictMode>
      <TimelapseFull />
    </StrictMode>,
  );
} else if (window.location.pathname === '/record/hero') {
  root.render(
    <StrictMode>
      <TimelapseHero />
    </StrictMode>,
  );
} else if (window.location.pathname === '/record/menu') {
  root.render(
    <StrictMode>
      <TimelapseMenu />
    </StrictMode>,
  );
} else if (window.location.pathname === '/record/storia') {
  root.render(
    <StrictMode>
      <TimelapseStoria />
    </StrictMode>,
  );
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
