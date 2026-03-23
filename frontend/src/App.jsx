import { AuthProvider } from './hooks/useAuth'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2200,
          style: {
            background: '#0c111b',
            color: '#d4dcec',
            border: '1px solid rgba(255,255,255,0.14)',
          },
          success: {
            iconTheme: {
              primary: '#67e8f9',
              secondary: '#0c111b',
            },
          },
        }}
      />
    </AuthProvider>
  )
}

export default App
