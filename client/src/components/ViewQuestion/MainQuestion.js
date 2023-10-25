import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFillBookmarkFill } from 'react-icons/bs';
import { AiOutlineHistory } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import ReactQuill from 'react-quill';
import './MainQuestion.css'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import axios from 'axios';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
function MainQuestion() {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState("")
    const user = useSelector(selectUser)

    const [questionData, setquestionData] = useState({
        question: {},
        answers: [],
        comments:[],
    })
    const [Answers, setAnswerData] = useState([])

    const handleQuill = (value)=>{
        setAnswer(value)
    }

    
    let search = window.location.search
    console.log("Search string: " + search)
    const params = new URLSearchParams(search)
    const id= params.get("q")
    console.log("id: " + id)
    useEffect(() => {
        async function getFunctionDetails() {
           await axios
            .get(`/api/question/${id}`)
            .then((res) => {
                console.log(res.data)
                setquestionData(res.data)
            }) 
            .catch((err) => console.log(err));
        }
        getFunctionDetails();
        
      }, [id]);
      async function getUpdatedAnswer() {
        await axios
          .get(`/api/question/${id}`)
          .then((res) => setquestionData(res.data))
          .catch((err) => console.log(err));
      }
    
      // console.log(questionData);
      const handleSubmit = async () => {
        const body = {
          question_id: id,
          answer: answer,
          user: user,
        };
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
    
        await axios
          .post("/api/answer", body, config)
          .then(() => {
            alert("Answer added successfully");
            setAnswer("");
            getUpdatedAnswer();
          })
          .catch((err) => console.log(err));
      };
return (
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                    <h2 className='main-question'>{questionData.question.title}</h2>
                    <Link to='/add-question'>
                    <button 
    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400">
    Ask Question
  </button> 
                    </Link>
                </div>
                <div className='main-desc'>
                    <div className='info'>
                        <p>Created at: {new Date(questionData.question.created_at).toLocaleString()}</p>
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
                            <p>Content of the question available here</p>
                            <div className='author'>
                                <small>asked at {new Date(questionData.question.created_at).toLocaleString()}</small>
                                <div className='auth-details'>
                                    <RxAvatar/>
                                    <p>{questionData?.question?.user?.displayName ? questionData?.question?.user?.displayName : String(questionData?.question?.user?.email).split('@')[0]}</p>
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
    }}>{questionData.answers.length} Answers</p>
    {
        questionData.answers.map((answer) => (
            <div className='all-questions-container' key={answer._id}>
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
                    <p>{parse(answer.answer)}</p>
                    <div className='author'>
                        <small>asked {new Date(answer.created_at).toLocaleString()}</small>
                        <div className='auth-details'>
                            <RxAvatar/>
                            <p>{answer?.user?.displayName ? answer?.user?.displayName : String(answer?.user?.email).split('@')[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }
</div>

            </div>
            <div className='main-answer'>
                <h3 style={{
                    fontSize: "22px",
                    margin: "10px 0",
                    fontWeight: "400"
                }}>Your Answer</h3>
                <ReactQuill onChange={handleQuill} className='react-quill' theme='snow' style={{
                    height: "200px"
                }}/>
            </div>
            
            <button type='submit' onClick={handleSubmit}
    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400 max-w-fit mx-auto my-20">
    Post Answer
  </button>    
        </div>
)
}

export default MainQuestion
