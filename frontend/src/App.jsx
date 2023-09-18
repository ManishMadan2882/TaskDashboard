import { useState,useEffect } from 'react'
import './App.css'
import { fetchContent } from './reduxStore/taskSlice'
import { useSelector, useDispatch } from 'react-redux'
import Tasks from './components/Tasks'
import Loader from './components/Loader'

function App() {
  const dispatch = useDispatch()
  
  const isLoading = useSelector(state => state.isLoading)

  useEffect(() => {
    dispatch(fetchContent())
  }, [dispatch])
  
  const content = useSelector((state) => state.contents)
  console.log(content);

  return (
    <>
      <Tasks/>
      <Loader/>
    </>
  )
}

export default App
