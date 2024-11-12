import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes.tsx'

const queryClient = new QueryClient()
const router = createBrowserRouter(routes)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="pikopiko-jayde.au.auth0.com"
      clientId="Fpz91Tje0kM9xKhZ4BM1o1EP2rP1vQr0"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://intellichef/api',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Auth0Provider>
  )
})
