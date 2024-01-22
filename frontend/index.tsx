// eslint-disable-next-line import/no-unassigned-import
import './index.scss'
import { Header } from './src/components/header/Header'
import { AboutPage } from './src/pages/about/AboutPage'
import { ImplementationPage } from './src/pages/implementation/ImplementationPage'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <>
        <Header />
        <main>
          <Routes>
            <Route element={<Navigate to='/about' />} exact path='/' />
            <Route element={<AboutPage />} path='/about' />
            <Route element={<ImplementationPage />} path='/implementation' />
          </Routes>
        </main>
      </>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

createRoot(document.querySelector('#app')).render(<App />)
