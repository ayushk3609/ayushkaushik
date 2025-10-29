import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import ErrorBoundary from './Components/ErrorBoundary';
import { TranslateProvider } from './Contexts/language';
import { ThemeProvider } from './Contexts/theme';



function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TranslateProvider>
          <Header />
          <Outlet/>
        </TranslateProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;