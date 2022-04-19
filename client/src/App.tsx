import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useAppDispatch } from 'src/redux/hooks'
import { Provider } from 'react-redux'

import { store } from 'src/redux/store'
import { GET_USER } from 'src/redux/actions/userActions'
 
import './App.module.scss'
import { AppRouter } from './pages'
import { Header } from './components/Header/Header'

function App() {
  const dispatch = useAppDispatch()
  dispatch(GET_USER())

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App
