import React,{useState,useEffect} from 'react'
import axios from 'axios'

function UserStatistics() {
    const [stats, setStats] = useState();
    const [chkvalue, setchkvalue] = useState(0.0);
    var roundedResult=0;
    useEffect(() => {
      axios.get('/api/question/stats')
        .then(res => {
            console.log("stats data",res.data);
            setStats(res.data)
            if (res.data) {
                const avg = (res.data.answerCount + res.data.commentCount) / res.data.questionCount;
                setchkvalue(avg);
              }
            //console.log("average count",averagecount) 
            //roundedResult = averagecount.toFixed(2);
           // setchkvalue(roundedResult)
    })  
        .catch(err => console.log(err)); 
    }, []);
    
    return (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
      
          <h1 className="text-3xl font-bold text-purple-600 mb-4">Platform Stats</h1>
      
          {stats && (
            <div className="text-gray-700 text-xl font-medium">
              <div className="flex justify-between mr-10">
                <div className='ml-10'>Questions:</div> 
                <div>{stats.questionCount}</div>
              </div>
      
              <div className="flex justify-between mt-2 mr-10">
                <div className='ml-10'>Answers:</div>
                <div>{stats.answerCount}</div>
              </div>
      
              <div className="flex justify-between mt-4 mr-10">
                <div className='ml-10'>Comments:</div>
                <div>{stats.commentCount}</div>   
              </div>

              <div className="flex justify-between mr-10 mt-5">
                <div className='ml-10'>Average Activity per question:</div>
                <div>{chkvalue.toFixed(2)}</div>
              </div>
            
      
              <div className="flex justify-between mr-10 mt-5">
                <div className='ml-10'>Latest Question:</div>
                <div>{new Date(stats.latestQuestionTime).toLocaleString()}</div>
              </div>
            </div>
          )}
      
        </div>
      );
}

export default UserStatistics