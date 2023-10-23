import React, { useEffect, useState } from 'react'
import './index.css'
import Sidebar from './Sidebar'
import MainPage from './MainPage'
import axios from 'axios'
function HomePage() {
  const [questions,setQuestions] = useState([])
  useEffect( ()=>{
    async function getQuestion(){
      await axios.get('/api/question').then((res)=>{
        console.log("hi there")
        console.log(res.data)
        setQuestions(res.data.reverse())
      }).catch((err)=> console.log(err))
    }
    getQuestion()
    
  },[])
  return (
    <div className='stack-index'>
        <div className='stack-index-content'>
            {console.log("INside the main page")}
            <Sidebar/>
            <MainPage questions = {questions}/>
        </div>
    </div>
  )
}

export default HomePage