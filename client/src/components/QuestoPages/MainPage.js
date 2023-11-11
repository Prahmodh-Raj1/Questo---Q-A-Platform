import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
//import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AllQuestions from './AllQuestions'
import './Main.css'
import { AiFillFilter } from 'react-icons/ai';
import axios from 'axios'
//import { useState } from 'react';

function MainPage({questions}) {

  const [search, setSearch] = useState('');

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
            <input 
        className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
        type="text"
        placeholder="Search questions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}  
      />
          </div>
         
      <div className="questions">
        {questions?.filter(q => 
          q.title.toLowerCase().includes(search.toLowerCase())
        ).map((_q,index) => (
          <AllQuestions 
            question={_q}
            search={search} 
            key={index}  
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default MainPage;
