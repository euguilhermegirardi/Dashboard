import AppProvider from './providers/AppProvider'
import Routes from './routes'

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
