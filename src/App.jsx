// import { useState } from 'react'
import { Provider  } from 'react-redux';
import './App.scss'
import store from './utils/store'

import Header from './components/Header';
import SideBar from './components/SideBar';
import Main from './components/Main';
// import Footer from './components/Footer';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <Header />
      <div className='grid'>
        <SideBar />
        <Main />
     </div>
    </Provider>
  )
}

export default App
