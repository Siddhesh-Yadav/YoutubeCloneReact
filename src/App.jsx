import { Provider  } from 'react-redux';
import './App.scss'
import store from './utils/store'
import { Outlet } from 'react-router-dom';
import useDarkMode from './hooks/useDarkMode';



function App() {
  const [theme, toggleTheme] = useDarkMode();
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  )
}

export default App
