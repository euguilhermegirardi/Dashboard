import * as React from 'react'
import styled, {ThemeProvider} from "styled-components";
import WebFont from 'webfontloader';

import {GlobalStyles} from './theme/GlobalStyle';
import {useTheme} from './hooks/useTheme';
import {useAuth} from './context/auth-context'
import {FullPageSpinner} from './components/lib'
import ThemeSelector from './components/ThemeSelector';
import Dialog from './components/Dialog';
import CreateThemeContent from './components/CreateThemeContent';

const UnauthenticatedApp = React.lazy(() => import('./authentication/unauthenticated-app'))
const AuthenticatedApp = React.lazy(() => import('./authentication/authenticated-app'))
const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function App() {
  const {user, userCheck} = useAuth()
  const {theme, themeLoaded, getFonts} = useTheme()
  const [selectedTheme, setSelectedTheme] = React.useState(theme)
  const [showDialog, setShowDialog] = React.useState(false)
  const [newTheme, setNewTheme] = React.useState()
  
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    })
  })

  React.useEffect(() => {
    setSelectedTheme(theme)
  }, [themeLoaded])

  const manageDialog = () => setShowDialog(!showDialog)

  const createTheme = newTheme => {
    console.log(newTheme)
    setShowDialog(false)
    setNewTheme(newTheme)
  }

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user || (!user && userCheck) ? (
        <>
          {
            themeLoaded && <ThemeProvider theme={ selectedTheme }>
              <GlobalStyles/>
              <Container style={{fontFamily: selectedTheme.font}}>
                <h1>Theming System</h1>
                <p>
                  Hey, There! It's great when the control is with you. The theming system
                  helps you in building a theme of your choice and apply it to test live. Why
                  wait? Just give it a try.
                </p>
                <button className="btn" onClick={ manageDialog }>Create a Theme</button>
                <Dialog 
                  header="Create a Theme"
                  body={ <CreateThemeContent create={ createTheme }/> }
                  open={ showDialog } 
                  callback = { manageDialog }/>
                <ThemeSelector setter={ setSelectedTheme } newTheme={ newTheme }/>
              </Container>
              <AuthenticatedApp /> 
            </ThemeProvider>
          }
        </>
      ) : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export {App}
