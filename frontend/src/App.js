import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ChatPage from './Pages/ChatPage'
import './App.css';
function App() {
  return (
    <div className='main-div'>
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </div >


  )
}

export default App