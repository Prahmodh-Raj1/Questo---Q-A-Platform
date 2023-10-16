import React from 'react'
import './Sidebar.css';
/*import StarIcon from '@material-ui/icons/Star';
import PublicIcon from '@material-ui/icons/Public'; 
import WorkIcon from '@material-ui/icons/Work';*/
import { Link as RouterLink} from 'react-router-dom';
function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar-container'>
            <div className='sidebar-options'>
                <div className='sidebar-option'>
                    <RouterLink to='/'>Home</RouterLink>
                </div>
                <div className='sidebar-option'>
                    <RouterLink to='/'>Public</RouterLink>
                    <div className='link'>
                        <div className='link-tag'>
                           
                            <RouterLink to='/'>Question</RouterLink>
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
                            
                            <RouterLink to='/'>Explore Collectives</RouterLink>
                        </div>
                        
                    </div>
                </div>
                <div className='sidebar-option'>
                    <p>Find a Job</p>
                    <div className='link'>
                        <div className='link-tag'>
                            
                            <RouterLink to='/'>Question</RouterLink>
                        </div>
                        
                    </div>
                    
                </div>
                <div className='sidebar-option'>
                    <p>TEAMS</p>
                    <div className='link-tag'>
                        
                        <RouterLink to='/'>Companies</RouterLink>        
                    </div>
                    
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default Sidebar