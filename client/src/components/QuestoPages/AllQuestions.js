import React from 'react'
import './AllQuestions.css'
import {Link} from 'react-router-dom'
function AllQuestions() {
  return (
    <div className='all-questions'>
      <div className='all-questions-container'>
        <div className='all-questions-left'>
          <div className='all-options'>
            <div className='all-option'>
              <p>0</p>
              <span>Votes</span>
            </div>
            <div className='all-option'>
              <p>0</p>
              <span>Answers</span>
            </div>
            <div className='all-option'>
              <small>0 Views</small>
            </div>
          </div>
        </div>
        <div className='question-answer'>
          <Link to='/question'>How to write a NestJs api endpoint</Link>
          <div style={{
            width: '90%'
          }}>
            <div>This is the question body that takes it's place in the webpage at this position</div>
          </div>
          <div style={{
            display: "flex"
          }}>
            <span className='question-tags'>react</span>
            <span className='question-tags'>NestJs</span>
            <span className='question-tags'>Nodejs</span>
            </div>
            <div className='author'>
              <small>Timestamp</small>
              <div className='auth-details'>
                <p>Username</p>
              </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default AllQuestions