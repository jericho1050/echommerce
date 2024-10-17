import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import SignIn, {action as signInAction} from './components/sign-in/SignIn'
import AuthProvider from './context/AuthContext'
import SignUpSide, {action as signUpAction} from './components/sign-up/SignUp'
import SellerDashboard from './routes/Seller/Seller'

const theme = createTheme( {
  palette: {
    mode: 'light',
    primary: {
      main: '#3F71AF'
    },
    secondary: {
      main: '#112D4E'
    },
    background: {
      default: 'F9F7F7'
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>YAWA</div>
  },
  {
    path: "/signin",
    element: <SignIn />,
    action: signInAction
  },
  {
    path: "/signup",
    element: <SignUpSide />,
    action: signUpAction
  },
  {
    path: "/seller/*",
    element: <SellerDashboard />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
