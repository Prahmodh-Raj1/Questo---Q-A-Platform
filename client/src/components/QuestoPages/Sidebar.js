import React from 'react'
import './Sidebar.css';
/*import StarIcon from '@material-ui/icons/Star';
import PublicIcon from '@material-ui/icons/Public'; 
import WorkIcon from '@material-ui/icons/Work';*/
import { MdPublic } from 'react-icons/md';
import { LiaStarSolid } from 'react-icons/lia';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { MdWork } from 'react-icons/md';
function Sidebar() {
    const navigate = useNavigate()
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
                           <MdPublic/>
                            <RouterLink to='/add-question'>Question</RouterLink>
                        </div>
                        <div className='tags'>
                            <p>Tags</p>
                            <p>Users</p>
                        </div>
                    </div>
                </div>
                <div className='sidebar-option'>
                    
                
                    <div className='link'>
  
                    </div>
                </div>
                <div className='sidebar-option'>
                    <p>Find a Job</p>
                    <div className='link'>
                        <div className='link-tag'>
                            
                            <RouterLink to='/add-question'>Post Question</RouterLink>
                        </div>
                        
                    </div>
                    
                </div>
                
                <div className='mt-6 mb-6'>
                <button onClick={()=> navigate('/analytics')}
    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400">
    View Analytics
  </button>
                </div>
                <div className='mt-6 mb-6'>
                <button  onClick={()=>navigate('/feedback')}
    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400">
    Give Feedback
  </button>
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default Sidebar