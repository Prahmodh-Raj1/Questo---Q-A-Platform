import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { signOut } from 'firebase/auth'
function Header() {
  const user = useSelector(selectUser)
  return (
    <header>
      <div className="header-left">
        
        <h1>Questo</h1>
        
        
        <a href="/" className="products-button">
          Products
        </a>
        
      </div>

      <div className="header-right">
        <button onClick={() => alert('Sign Up')}>Sign Up</button>
        <button onClick={()=>{
          signOut()
        }}>Log In</button> 
      </div>
    </header>
  )
}

export default Header