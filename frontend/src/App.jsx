import { useState, useEffect } from 'react'
import './App.css'
import { fetchContent } from './reduxStore/taskSlice'
import { useSelector, useDispatch } from 'react-redux'
import Tasks from './components/Tasks'
import Loader from './components/Loader'
import Login from './components/Login'
import Register from './components/Register'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { fetchUser } from './api'
import Dashboard from './components/Dashboard'
function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.isLoading)
  const [auth,setAuth] = useState({success : false})
  useEffect(() => {
    console.log(window.location.href);
    fetchUser().then(data => {
      if (!data.success) {
        console.log(window.location.href)
          if(window.location.href === 'http://localhost:5173/')
          window.location.href = '/register'
      }
      else setAuth(data)
    })
  }, [])

  const content = useSelector((state) => state.contents)
  console.log(content);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard user={auth}/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
