import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthenticationProvider } from '../contexts/Authentication'

const AppProvider = ({children}) => {
  return (
    <>
      <AuthenticationProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </AuthenticationProvider>

      <ToastContainer position="bottom-center" />
    </>
  )
}

export default AppProvider