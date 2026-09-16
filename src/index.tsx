import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CustomThemeProvider } from './contexts/ThemeContext';
import 'mapbox-gl/dist/mapbox-gl.css';

const basename = process.env.PUBLIC_URL;

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found in index.html');

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
