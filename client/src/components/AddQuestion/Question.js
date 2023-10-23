import React,{useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'  //necessary for quill's css
import {TagsInput} from 'react-tag-input-component'
import './Question.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {selectUser} from '../../features/userSlice'
import Axios from 'axios'
function Question() {
    const [tags, setTags] = useState([]);
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    function handleQuill(value){
        setBody(value)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log("Inside the function")
        if(title !== "" && body !==""){
            setLoading(true)
            const bodyJSON = {
                title: title,
                body: body,
                tags: JSON.stringify(tags),
                user: user
            }
            console.log(bodyJSON)
            await Axios.post('/api/question',bodyJSON).then((res)=>{
                alert('Question added successfully')
                setLoading(false)
                navigate('/')
            }).catch((err)=>{
                console.error("There is an error here: ",err)
                setLoading(true)
            })
        }
        
    }
  return (
    <div className='overall-page'>
    <div className='add-question'>
        <div className='add-question-container'>
            <div className='head-title'>
                <h1>Ask a public Question</h1>
                </div>
            <div className='question-container'>
            <div className='question-options'>
            <div className='question-option'>
                <div className='title'>
                    <h3>Title</h3>
                    <small>Be specific and precise</small>
                    <input value={title} onChange= {(e)=> setTitle(e.target.value)} type='text' placeholder='Add the Question Title'></input>
                </div>
            </div>
            <div className='question-option'>
            <div className='title'>
                    <h3>Body</h3>
                    <small>Include all necessary information</small>
                    <ReactQuill value={body} onChange={handleQuill} className='react-quill' theme='snow'/>
                </div>
            </div>
            <div className='question-option'>
            <div className='title'>
                    <h3>Tags</h3>
                    <small>Add upto 5 tags to describe your question</small>
                    <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        placeHolder="Press enter to add tags"
                    />
                </div>
            </div>
            </div>
            </div>
            <button type='submit' onClick={handleSubmit} className='button'>{
                loading ? 'Adding question...': 'Add your question'
            }</button>    
        </div>
    </div>
    </div>
  )
}

export default Question