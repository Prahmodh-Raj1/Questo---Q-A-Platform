import React from 'react'
import './index.css'
import Sidebar from './Sidebar'
import MainPage from './MainPage'
function HomePage() {
  return (
    <div className='stack-index'>
        <div className='stack-index-content'>
          
            <Sidebar/>
            <MainPage/>
        </div>
    </div>
  )
}

export default HomePage