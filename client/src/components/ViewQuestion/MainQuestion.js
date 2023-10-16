import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFillBookmarkFill } from 'react-icons/bs';
import { AiOutlineHistory } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import ReactQuill from 'react-quill';
import './MainQuestion.css'
import 'react-quill/dist/quill.snow.css'
function MainQuestion() {
    const [show, setShow] = useState(false);
return (
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                    <h2 className='main-question'>Question Title</h2>
                    <Link to='/add-question'>
                        <button>Ask Question</button>
                    </Link>
                </div>
                <div className='main-desc'>
                    <div className='info'>
                        <p>Timestamp</p>
                        <p>Active<span>today</span></p>
                        <p>Views<span>today</span></p>

                    </div>
                </div>
                    <div className='all-questions'>
                        <div className='all-questions-container'>
                        <div className='all-questions-left'>
                            <div className='all-options'>
                                <p className='arrow'>⬆</p>
                                <p className='arrow'>0</p>
                                <p className='arrow'>⬇</p>
                                <BsFillBookmarkFill/>
                                <AiOutlineHistory/>
                            </div>
                        </div>
                        <div className='question-answer'>
                            <p>This is question body</p>
                            <div className='author'>
                                <small>asked Timestamp</small>
                                <div className='auth-details'>
                                    <RxAvatar/>
                                    <p>Author name</p>
                                </div>
                            </div>
                            <div className="comments">
                                <div className="comment">
                                    <p>This is comment - <span>Username</span>
                                <small>Timestamp</small></p>
                                    
                                </div>
                                <p onClick={()=> setShow(!show)}>Add comment</p>
                                {
                                    show && (<div className='title'>
                                        <textarea type = "text" placeholder='Add your comment...' rows={5} style={{
                                            margin: "5px 0px",
                                            padding: "10px",
                                            border: "1px solid rgba(0,0,0,0.2)",
                                            borderRadius: "3px",
                                            outline:'none'
                                        }}></textarea>
                                        <button style={{
                                            maxWidth: 'fit-content'
                                        }}>Add Comment</button>
                                    </div>)
                                }
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='all-questions' style={{
                        flexDirection: 'column',
                    }}>
                        <p style={{
                            marginBottom: "20px",
                            fontSize: "1.3rem",
                            fontWeight: "300",
                        }}>No. of answers</p>
                        <div className='all-questions-container'>
                        <div className='all-questions-left'>
                            <div className='all-options'>
                                <p className='arrow'>⬆</p>
                                <p className='arrow'>0</p>
                                <p className='arrow'>⬇</p>
                                <BsFillBookmarkFill/>
                                <AiOutlineHistory/>
                            </div>
                        </div>
                        <div className='question-answer'>
                            <p>This is question body</p>
                            <div className='author'>
                                <small>asked Timestamp</small>
                                <div className='auth-details'>
                                    <RxAvatar/>
                                    <p>Author name</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='main-answer'>
                <h3 style={{
                    fontSize: "22px",
                    margin: "10px 0",
                    fontWeight: "400"
                }}>Your Answer</h3>
                <ReactQuill className='react-quill' theme='snow' style={{
                    height: "200px"
                }}/>
            </div>
            <button style={{
                maxWidth: 'fit-content',
                margin: "80px 0"
            }} type='button'>Post your Answer</button>    
        </div>
)
}

export default MainQuestion