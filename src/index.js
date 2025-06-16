import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CustomThemeProvider } from './contexts/ThemeContext';
import 'mapbox-gl/dist/mapbox-gl.css';

const basename = process.env.PUBLIC_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);