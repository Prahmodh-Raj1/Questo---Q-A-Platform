import React from 'react'
import { Link } from 'react-router-dom'
//import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AllQuestions from './AllQuestions'
import './Main.css'
function MainPage() {
  return (
    <div className='main'>
        <div className='main-container'>
          <div className='main-top'>
            <h2>All Questions</h2>
            <Link to='/'>
              <button>Ask Question</button>
            </Link>
        
          </div>
          <div className='main-dec'>
            <p>All questions</p>
            <div className='main-filter'>
              <div className='main-tabs'>
                <div className='main-tab'>
                  <Link to='/'>Most Recent</Link>
                </div>
                <div className='main-tab'>
                  <Link to='/'>Active</Link>
                </div>
                <div className='main-tab'>
                  <Link to='/'>More</Link>
                </div>
              </div>
              <div className='main-filter-item'>
                <p>Filter</p>
              </div>
            </div>
          </div>
          <div className='questions'>
                <div className='question'>
                  <AllQuestions/>  
                </div>
          </div>
        </div>
    </div>
    
  )
}

export default MainPage