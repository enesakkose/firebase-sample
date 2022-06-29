import { Toaster } from 'react-hot-toast' 
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Settings from './pages/Settings'

function App() {
  

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/settings' element={<Settings/>}/>
      </Routes>
    </>
  )
}

export default App
