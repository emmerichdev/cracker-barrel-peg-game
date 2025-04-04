import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/main.css';

const applyInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light' || savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
};

applyInitialTheme();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 