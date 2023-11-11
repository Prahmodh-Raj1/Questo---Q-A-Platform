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
import emailjs from 'emailjs-com'
function MainQuestion() {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState("")
    const [votes,setVotes] = useState(0)
    const user = useSelector(selectUser)
    const [bodycontent, setBodyContent] = useState("")
    const [comment, setComment] = useState("")
    
    const [questionData, setquestionData] = useState({
        question: {},
        answers: [],
        comments:[],
    })
    const [Answers, setAnswerData] = useState([])
    const [qvotes, setQVotes] = useState(0);
    const upvoteQuestion = async () => {
      const res = await axios.put(`/api/question/${questionData.question._id}/upvote`);
      setQVotes(res.data.votes);
    }

    const downvoteQuestion = async () => {
      const res = await axios.put(`/api/question/${questionData.question._id}/downvote`);
      setQVotes(res.data.votes); 
    }

    const handleQuill = (value)=>{
        setAnswer(value)
    }
    const sendEmailAnswer = () => {
        const templateParams = {
            name: questionData?.question?.user?.displayName ? questionData?.question?.user?.displayName : String(questionData?.question?.user?.email).split('@')[0],
            sender: user?.displayName ? user?.displayName:String(user?.email).split('@')[0],
            question_id: questionData.question._id,
            title: questionData.question.title,
            created_at: questionData.question.created_at,
            adminemail: "prahmodh@gmail.com",
            message: "Thank you for using the Questo Platform",
            to_email: questionData.question.user.email
        } 
        const emailParams = {
            service_id: 'service_wimtjw7',
            template_id: 'template_mb85zx1',
            user_id: '6LPkf5o1DnbiXrMSG',
            template_params: templateParams,
            to_email: questionData.question.user.email
          };
          emailjs
          .send(
            emailParams.service_id,
            emailParams.template_id,
            emailParams.template_params,
            emailParams.user_id,
            emailParams.to_email
          )
          .then((result) => {
            console.log('Email sent successfully:', result.text);
          })
          .catch((error) => {
            console.error('Error sending email:', error.text);
          });
    }
    
    const sendEmailComment = () => {
        const templateParams = {
            name: questionData?.question?.user?.displayName ? questionData?.question?.user?.displayName : String(questionData?.question?.user?.email).split('@')[0],
            sender: user?.displayName ? user?.displayName:String(user?.email).split('@')[0],
            question_id: questionData.question._id,
            title: questionData.question.title,
            created_at: questionData.question.created_at,
            adminemail: "prahmodh@gmail.com",
            message: "Thank you for using the Questo Platform",
            to_email: questionData.question.user.email
        }
        const emailParams = {
            service_id: 'service_wimtjw7',
            template_id: 'template_hppxait',
            user_id: '6LPkf5o1DnbiXrMSG',
            template_params: templateParams,
            to_email: questionData.question.user.email
          };
          emailjs
          .send(
            emailParams.service_id,
            emailParams.template_id,
            emailParams.template_params,
            emailParams.user_id,
            emailParams.to_email
          )
          .then((result) => {
            console.log('Email sent successfully:', result.text);
          })
          .catch((error) => {
            console.error('Error sending email:', error.text);
          });
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
                setBodyContent(res.data.question.body);
                console.log("bodycontent: ",bodycontent)
                setQVotes(res.data.question.votes)
            }) 
            .catch((err) => console.log(err));
        }
        getFunctionDetails();
        
      }, [id]);
      async function getUpdatedAnswer() {
        await axios
          .get(`/api/question/${id}`)
          .then((res) => {
            setquestionData(res.data)
            setBodyContent(res.data.question.body);
            console.log("bodycontent: ",bodycontent)
          })
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
            sendEmailAnswer();
          })
          .catch((err) => console.log(err));
      };

      const handleComment = async() =>{
        if(comment!==""){
            const body = {
                question_id: id,
                comment: comment,
                user: user
            }
            await axios.post(`/api/comment/${id}`,body).then((res)=>{
                console.log(res.data)
                setComment("")
                alert("Comment added successfully")
                setShow(false)
                getUpdatedAnswer()
                sendEmailComment()
                
            })
        }
        
      }
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
                        

                    </div>  
                </div>
                    <div className='all-questions'>
                        <div className='all-questions-container'>
                        <div className='all-questions-left'>
                            <div className='all-options'>
                            <span className="arrow" onClick={upvoteQuestion}>▲</span>

                            <p className="arrow" >{qvotes}</p>

                            <span className="arrow" onClick={downvoteQuestion}>▼</span>
                                <BsFillBookmarkFill/>
                                <AiOutlineHistory/>
                            </div>
                        </div>
                        <div className='question-answer'>
                            <p>{parse(bodycontent)}</p>
                            <div className='author'>
                                <small>asked at {new Date(questionData.question.created_at).toLocaleString()}</small>
                                <div className='auth-details'>
                                    <RxAvatar/>
                                    <p>{questionData?.question?.user?.displayName ? questionData?.question?.user?.displayName : String(questionData?.question?.user?.email).split('@')[0]}</p>
                                </div>
                            </div>
                            <div className="comments">
                <div className="comment">
                  {questionData?.comments &&
                    questionData?.comments.map((_qd) => (
                      <p key={_qd?._id}>
                        {_qd.comment}{"\n"}
                        <span>
                          - {_qd.user.displayName ? _qd.user.displayName : String(_qd?.user?.email).split('@')[0]}
                        </span>{" "}
                        {"    "}
                        <small>
                          {new Date(_qd.created_at).toLocaleString()}
                        </small>
                      </p>
                    ))}
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={handleComment}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400 max-w-fit mx-auto my-20"
                    >
                      Add comment
                    </button>
                  </div>
                )}
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
                    <p className="arrow" onClick={()=>setVotes(votes+1)}>▲</p>

                    <p className="arrow">{votes}</p>

                    <p className="arrow" onClick={()=>setVotes(votes-1)}>▼</p>
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