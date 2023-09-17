import { useState,useEffect } from 'react'
import './App.css'
import { fetchContent } from './reduxStore/taskSlice'
import { useSelector, useDispatch } from 'react-redux'
import Tasks from './components/Tasks'

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchContent())
  }, [dispatch])
  
  const content = useSelector((state) => state.contents)
  console.log(content);

  return (
    <>
      <Tasks/>
    </>
  )
}

export default App
