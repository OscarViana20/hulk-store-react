// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
import { App } from './App.jsx'

import './styles.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
  // </StrictMode>,
)
