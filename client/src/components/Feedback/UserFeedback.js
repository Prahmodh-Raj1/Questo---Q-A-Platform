import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'
export default function UserFeedback() {
    const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');
  const sendEmailFeedback = () => {
    const templateParams = {
        name: username,
        feedback: feedback,
        message: "Thank you for using the Questo Platform",
       
    } 
    const emailParams = {
        service_id: 'service_rsu8u35',
        template_id: 'template_35d2fjd',
        user_id: 'mL2pXhDhu9PdfhtAE',
        template_params: templateParams,
        
      };
      emailjs
      .send(
        emailParams.service_id,
        emailParams.template_id,
        emailParams.template_params,
        emailParams.user_id,
       
      )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
      })
      .catch((error) => {
        console.error('Error sending email:', error.text);
      });
}

  const handleSubmit = ()=>{
    sendEmailFeedback();
    navigate('/home')
  }
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-2xl font-bold mb-5 text-gray-800">Feedback Form</h1>

        <div className="space-y-2">
          <label className="text-gray-700">Username:</label>
          <input 
            type="text"
            className="border p-2 rounded-lg w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="space-y-2 mt-5">
          <label className="text-gray-700">Feedback:</label>
          <textarea
            className="border p-2 rounded-lg w-full" 
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}  
          ></textarea>
        </div>

        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-5">
          Submit
        </button>
      </div>
    </div>
  )
}