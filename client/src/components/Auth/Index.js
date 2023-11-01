import React, { useState, useEffect } from 'react'
import './index.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
function Index() {
  const dispatch = useDispatch();
  const [register,setRegister] = useState(false);
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("")
  const navigate = useNavigate()
  const handleLogin = (user) => {
    // Serialize the user object to only include necessary data
    const serializableUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      // Add any other relevant user data you need
    };
    dispatch(login(serializableUser));
  };

  const handleSigninGoogle = ()=>{
    signInWithPopup(auth,provider).then((res)=>{
      console.log(res);
      const user = res.user;
      handleLogin(user)
      navigate('/home')
    })
  }
  const handleRegister = (e)=>{
    e.preventDefault()
    setError("")
    setLoading(true)
    if(email==="" || password==="" || username===""){
      setError("Required fields are missing")
    }else{
      createUserWithEmailAndPassword(auth,email,password).then((res)=>{
        console.log(res)
        const user = res.user;
        handleLogin(user)
        
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setError(err.message)
        setLoading(false)
      })
    }

  }
  const handleSignIn = (e)=>{
    e.preventDefault()
    setError("")
    setLoading(true)
    if(email ==="" || password ==="" ){
      setError("Required field is missing")
      setLoading(false)
    }else{
      signInWithEmailAndPassword(auth,email,password).then((res)=>{
        console.log(res)
        const user = res.user
        handleLogin(user)
        navigate('/home')
        setLoading(false)
      }).catch((err)=>{
        console.log(err.code)
        setError(err.message)
        setLoading(false)
      })
    }
  }
  useEffect(() => {
    // You can use this useEffect to check if the user is already authenticated and set the user in the store.
    if(auth.currentUser){
      handleLogin(auth.currentUser);
    }
    
  }, []);
  return (
    <div className='auth'>
      <div className='auth-container'>
        
         <div className='sign-options'>
          <div onClick={handleSigninGoogle} className='single-option'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width='80px' alt="Google"/>
            <p>Login with Google</p>
          </div>
         </div>
         <div className='auth-login'>
          <div className='auth-login-container'>
              {
                register ? (<>
                  <div className='input-field'>
                    <p>Username</p>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type='text'/>
                  </div>
                  <div className='input-field'>
                    <p>Email</p>
                    <input value={email} onChange = {(e)=>setEmail(e.target.value)} type='text'/>
                  </div>
                  <div className='input-field'>
                    <p>Password</p>
                    <input value={password} onChange={
                      (e)=>setPassword(e.target.value) 
                    }type='password'/>
                  </div>
                  <button onClick={handleRegister} disabled={loading} className='bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded mt-5'>{loading ? 'Registering...':'Register'}</button>
                </>):(<>
                  
                  <div className='input-field'>
                    <p>Email</p>
                    <input value={email} onChange = {(e)=>setEmail(e.target.value)} type='text'/>
                  </div>
                  <div className='input-field'>
                    <p>Password</p>
                    <input value={password} onChange={
                      (e)=>setPassword(e.target.value) 
                    }type='password'/>
                  </div>
                  <button onClick={handleSignIn} disabled={loading} className='bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded mt-5'>{loading ? 'Signing in...' : 'Login'}</button></>)
              }
              <p onClick={()=>{
                setRegister(!register)
              }} style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#0095ff",
                textDecoration: "underline",
                cursor: "pointer"
              }}>{register ? "Login" : "Register"}</p>
          </div>
         </div>
         {
          error !=="" && (<p style={{
            color: "red",
            fontSize: "14px"
          }}>
            {error}
          </p>)
         }
      </div>
    </div>
  )
}

export default Index