/* eslint-disable prettier/prettier */
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute'
import { useTokenExpiration } from './hooks/useTokenExpiration'
import { ToastProvider } from './components/Toast/Toast'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Getallusers = React.lazy(() => import('./views/pages/allUsers/UserList'))
const MyAccount = React.lazy(() => import('./views/pages/allUsers/My Accout/MyAccount'))
const Page401 = React.lazy(() => import('./views/pages/page401/Page401'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  useTokenExpiration()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ToastProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route
              exact
              path="/profile"
              name="profile"
              element={
                <ProtectedRoute>
                  <MyAccount />
                </ProtectedRoute>
              }
            />
            {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}
            <Route
              exact
              path="/register"
              name="Register Page"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/all-users"
              name="All Users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Getallusers />
                </ProtectedRoute>
              }
            />

            <Route exact path="/401" name="Page 401" element={<Page401 />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
            <Route
              path="*"
              name="Home"
              element={
                <ProtectedRoute>
                  {' '}
                  <DefaultLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
