import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import PublicIcon from '@material-ui/icons/Public'; 
function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar-container'>
            <div className='sidebar-options'>
                <div className='sidebar-option'>
                    <a>Home</a>
                </div>
                <div className='sidebar-option'>
                    <a>Public</a>
                    <div className='link'>
                        <div className='link-tag'>
                            <PublicIcon/>
                            <a>Question</a>
                        </div>
                        <div className='tags'>
                            <p>Tags</p>
                            <p>Users</p>
                        </div>
                    </div>
                </div>
                <div className='sidebar-option'>
                    <p>Collectives</p>
                
                    <div className='link'>
                        <div className='link-tag'>
                            <StarIcon/>
                            <a>Explore Collectives</a>
                        </div>
                        
                    </div>
                </div>
                <div className='sidebar-option'>
                    <p>Find a Job</p>
                    <div className='link'>
                        <div className='link-tag'>
                            <StarIcon/>
                            <a>Question</a>
                        </div>
                        
                    </div>
                    
                </div>
                <div className='sidebar-option'>
                    <p>TEAMS</p>
                    
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default Sidebar