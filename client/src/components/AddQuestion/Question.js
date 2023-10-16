import React,{useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'  //necessary for quill's css
import {TagsInput} from 'react-tag-input-component'
import './Question.css'
function Question() {
    const [tags, setTags] = useState([]);
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
                    <input type='text' placeholder='Add the Question Title'></input>
                </div>
            </div>
            <div className='question-option'>
            <div className='title'>
                    <h3>Body</h3>
                    <small>Include all necessary information</small>
                    <ReactQuill className='react-quill' theme='snow'/>
                </div>
            </div>
            <div className='question-option'>
            <div className='title'>
                    <h3>Tags</h3>
                    <small>Add upto 5 tags to describe your question</small>
                    <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="fruits"
                        placeHolder="enter fruits"
                    />
                </div>
            </div>
            </div>
            </div>
            <button className='button'>Add your question</button>    
        </div>
    </div>
    </div>
  )
}

export default Question