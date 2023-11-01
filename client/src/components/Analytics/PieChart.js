import React,{useState, useEffect} from "react";
import { Pie} from "react-chartjs-2";
import axios from "axios"
//import { ArcElement } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';



Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);
const PieChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      },
    ],
    });
    const pieoptions = {
        type: "pie",
      options: {
        title: {
          display: true,
          text: "World Wide Wine Production"
        }
      }
    
      }
    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get("/api/question/retrieve");
          const { labels, datasets} = response.data;
          console.log(datasets);
          console.log(labels);
          let questions = datasets[0].data[0];
          let answers = datasets[0].data[1];
          let comments = datasets[0].data[2];
          console.log("questions: ",questions, " answers: ",answers, " comments: ",comments);
          setChartData({
            labels:['Questions','Answers','Comments'],
            datasets: [
              {
                label: 'Count',
                data: [questions,answers,comments],
                backgroundColor: [ '#FF6384',
                '#36A2EB',
                '#FFCE56']
              } 
            ]
          })
        };
        console.log("This is chartdata",chartData)
        fetchData();
        console.log("This is chartdata",chartData)
      }, []);

      
      console.log("Inside: This is chartdata",chartData)
  return (
    
    <div style={{padding: '20px', margin: 'auto', height: '50%', width: '50%'}}>
        <h2 style={{
    fontSize: '32px',
    fontWeight: 'bold', 
    color: 'linear-gradient(to right, #00b7ff, #009dff)',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '20px',
    textDecoration: 'underline',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  }}>  
    Questions vs Answers vs Comments on Questo
  </h2>
    <Pie 
      data={chartData}
      options={pieoptions}
    />
    </div>
  )
};

export default PieChart;
