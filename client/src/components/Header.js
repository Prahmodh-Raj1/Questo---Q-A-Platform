import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import { RxAvatar } from 'react-icons/rx'
import { BiSolidInbox, BiHelpCircle } from 'react-icons/bi';
//import { signOut } from 'firebase/auth'
function Header() {
  const user = useSelector(selectUser)
  console.log(user)
  //const navigate = useNavigate()
  return (
    <header>
      <div className="header-left">
        
        <h1>Questo</h1>
        
        
        <a href="/" className="products-button">
          Products
        </a>
        
      </div>
      <div className="header-right">
    <span onClick={()=>{
      auth.signOut();
    }}><RxAvatar size={72}/></span>

    <span onClick={()=>{
      
    }}><BiSolidInbox size={72}/></span> 
    <BiHelpCircle size={72} />
  </div>
      {/*<div className="header-right">
        <button onClick={() => alert('Sign Up')}>Sign Up</button>
        <button onClick={
          ()=>{
            auth.signOut()
          }
        }>Log In</button> 
      </div>*/}
    </header>
  )
}

export default Header