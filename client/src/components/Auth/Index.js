import React, { useState } from 'react'
import './index.css'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
function Index() {
  const [register,setRegister] = useState(false);
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("")

  const handleSigninGoogle = ()=>{
    signInWithPopup(auth,provider).then((res)=>{
      console.log(res)
    })
  }
  const handleRegister = ()=>{
    setError("")
    setLoading(true)

  }
  const handleSignIn = ()=>{
    setError("")
    setLoading(true)
    if(email ==="" || password ==="" ){
      setError("Required field is missing")
      setLoading(false)
    }else{
      signInWithEmailAndPassword(auth,email,password).then((res)=>{
        console.log(res)
        setLoading(false)
      }).catch((err)=>{
        console.log(err.code)
        setError(err.message)
        setLoading(false)
      })
    }
  }
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
                    <input type='text'/>
                  </div>
                  <div className='input-field'>
                    <p>Email</p>
                    <input type='text'/>
                  </div>
                  <div className='input-field'>
                    <p>Password</p>
                    <input type='text'/>
                  </div>
                  <button style={{
                    marginTop: "10px"
                  }}>Register</button>
                </>):(<>
                  
                  <div className='input-field'>
                    <p>Email</p>
                    <input type='text'/>
                  </div>
                  <div className='input-field'>
                    <p>Password</p>
                    <input type='text'/>
                  </div>
                  <button style={{
                    marginTop: "10px"
                  }}>Login</button></>)
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
      </div>
    </div>
  )
}

export default Index