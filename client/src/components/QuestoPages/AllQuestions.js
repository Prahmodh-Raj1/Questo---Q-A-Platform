import React from 'react'
import './AllQuestions.css'
import {Link} from 'react-router-dom'
import parse from 'html-react-parser'
import { RxAvatar } from 'react-icons/rx'
function AllQuestions({question}) {
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  let tags = JSON.parse(question?.tags[0])
  //const tags=[]
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
              <p>{question?.answerDetails?.length}</p>
              <span>Answers</span>
            </div>
            <div className='all-option'>
              <small>0 Views</small>
            </div>
          </div>
        </div>
        <div className='question-answer'>
          {console.log('questionid: ',question?._id)}
          <Link to={`/question?q=${question?._id}`}>{parse(truncate(question?.title),100)}</Link>
          <div style={{
            width: '90%'
          }}>
            <div>{parse(truncate(question?.body,200))}</div>
          </div>
          
          <div style={{
            display: "flex"
          }}>
            {tags.map((_tag,index) => (
              <p key={index}
                style={{
                  margin: "10px 5px",
                  padding: "5px 10px",
                  backgroundColor: "#007cd446",
                  borderRadius: "3px",
                }}
              >
                {_tag}
              </p>
            ))}
            
            </div>
            <div className='author'>
              <small>{new Date(question?.created_at).toLocaleString()}</small>
              <div className='auth-details'>
                <RxAvatar size={30}/>
                <p style={{
                  fontSize: "18px"
                }}>{question?.user?.displayName ? question?.user?.displayName : String(question?.user?.email).split('@')[0]}</p>
              </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default AllQuestions