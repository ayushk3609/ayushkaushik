import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import { TranslateProvider } from './Contexts/language';
import { ThemeProvider } from './Contexts/theme';



function App() {
  return (
    <ThemeProvider>
      <TranslateProvider>
        <Header />
        <Outlet/>
      </TranslateProvider>
    </ThemeProvider>
  );
}

export default App;