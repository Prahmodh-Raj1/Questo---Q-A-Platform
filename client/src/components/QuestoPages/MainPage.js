import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
//import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AllQuestions from './AllQuestions'
import './Main.css'
import { AiFillFilter } from 'react-icons/ai';
import axios from 'axios'
function MainPage({questions}) {
  /*const [questions,setQuestions] = useState([])
  useEffect( ()=>{
    //async function getQuestion(){
      axios.get('/api/question').then((res)=>{
        console.log("hi there")
        console.log(res.data)
      }).catch((err)=> console.log(err))
    
    //getQuestion()
    
  },[])*/
  return (
    <div className='main'>
        <div className='main-container'>
          <div className='main-top'>
            <h2>All Questions</h2>
            <Link to='/add-question'>
            <button 
    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400">
    Ask Question
  </button> 
            </Link>
        
          </div>
          <div className='main-dec'>
            <p>{questions && questions.length} Questions</p>
            <div className='main-filter'>
              <div className='main-tabs'>
                
              </div>
              
            </div>
          </div>
          <div className="questions">
          {questions?.map((_q,index) => (
            <div key = {index} className="question">
              <AllQuestions question={_q} />
            </div>
          ))}
        </div>
        </div>
    </div>
    
  )
}

export default MainPage