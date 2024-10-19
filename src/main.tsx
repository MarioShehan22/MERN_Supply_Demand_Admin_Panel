import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router} from "react-router-dom";
import './index.css'
import AppRouters from "@/AppRouters";
import 'bootstrap/dist/css/bootstrap.min.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus:false,
        },
    },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router>
          <QueryClientProvider client={queryClient}>
            <AppRouters />
          </QueryClientProvider>
      </Router>
  </React.StrictMode>,
)
