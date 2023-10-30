import React, { useEffect } from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/QuestoPages/HomePage';
import Question from './components/AddQuestion/Question';
import ViewPage from './components/ViewQuestion/ViewPage';
import Index from './components/Auth/Index';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
//import { Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
//import { selectUser } from './features/userSlice';
import { Navigate } from 'react-router-dom';
import Provider from 'react-redux';
import MainLanding from './components/LandingPages/MainLanding';
import Analysis from './components/Analytics/Analysis';
import UserFeedback from './components/Feedback/UserFeedback';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const auth = getAuth()
  /*const PrivateRoute = ({ children }) => {
    const user = useSelector(selectUser);
    console.log("user: ",user)
  
    // Check if the user is logged in (user exists in Redux store)
    if (user) {
      return children; // Render the child components if the user is authenticated
    } else {
      return <Navigate to="/auth" />; // Redirect to the authentication page if the user is not authenticated
    }
  };*/
  
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          displayName: authUser.displayName,
          email: authUser.email
        }))
      }else{
        dispatch(logout())
      }
    })
  },[dispatch])
  
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLanding/>}/>
          <Route path="/auth" element={<Index />} />
          <Route path="/feedback" element={<PrivateRoute><UserFeedback/></PrivateRoute>}/>
          <Route path='/analytics' element={<PrivateRoute><Analysis/></PrivateRoute>}></Route>
          <Route path="/home" element={<PrivateRoute user={user}><HomePage /></PrivateRoute>} />
          
          <Route path="/add-question" element={<PrivateRoute user={user}><Question /></PrivateRoute>} />
          <Route path="/question" element={<PrivateRoute user={user}><ViewPage /></PrivateRoute>} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
