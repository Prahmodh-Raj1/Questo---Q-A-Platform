import React from 'react'
import Sidebar from '../QuestoPages/Sidebar'
import MainQuestion from './MainQuestion'
import './ViewPage.css'
function ViewPage() {
  return (
    <div className='stack-index'>
        <div className='stack-index-content'>
        <Sidebar/>
        <MainQuestion/>
        </div>
    </div>
  )
}

export default ViewPage