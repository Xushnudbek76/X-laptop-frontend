import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";

import { store } from './app/store';
import App from './app/App';
import { BrowserRouter } from 'react-router';
import "./css/main.css";
import ContextProvider from './app/components/context/ContextProvider';
import ScrollToTop from './app/components/hooks/UseScroll';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}  >
      <ContextProvider>
      <BrowserRouter>
      <ScrollToTop/>
     <App/>
      </BrowserRouter>
      </ContextProvider>
    </Provider>
  </StrictMode>,
)
