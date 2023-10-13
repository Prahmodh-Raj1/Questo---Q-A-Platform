import React from 'react'
import './Header.css'
function Header() {
  return (
    <header>
      <div className="header-left">
        <h1>Questo</h1>
        <a href="#products" className="products-button">
          Products
        </a>
      </div>

      <div className="header-right">
        <button onClick={() => alert('Sign Up')}>Sign Up</button>
        <button onClick={() => alert('Log In')}>Log In</button> 
      </div>
    </header>
  )
}

export default Header