// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

import 'react-lazy-load-image-component/src/effects/blur.css';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
import { SnackbarProvider } from './components/snackbar';

export default function App() {

  useScrollToTop();

  return (
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light', // 'light' | 'dark'
          themeDirection: 'ltr', //  'rtl' | 'ltr'
          themeContrast: 'default', // 'default' | 'bold'
          themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
          themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
          themeStretch: false,
        }}
      >
        <ThemeProvider>
          <SnackbarProvider>
            <MotionLazy>
              <SettingsDrawer />
              <ProgressBar />
                <Router />
            </MotionLazy>
          </SnackbarProvider>
        </ThemeProvider>
      </SettingsProvider>
  );
}
