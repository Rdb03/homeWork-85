import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import theme from "../theme.ts";
import { persist, store } from './app/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PersistGate persistor={persist}>
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
  </PersistGate>
)
