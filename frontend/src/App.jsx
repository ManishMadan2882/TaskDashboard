import { useState,useEffect } from 'react'
import TaskDisplay from './components/TaskDisplay'
import './App.css'
import { fetchContent } from './reduxStore/taskSlice'
import { useSelector, useDispatch } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchContent())
  }, [dispatch])
  const State = useSelector((state) => state)
  console.log(State.contents);

  return (
    <>
      <TaskDisplay/>
    </>
  )
}

export default App
