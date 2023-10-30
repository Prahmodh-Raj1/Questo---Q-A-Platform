import React,{useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';


Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);
/*const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Revenue',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
};
*/
function BarChart() {
    const optionsbar = {
        options: {
          animations: {
            y: {
              easing: 'easeInOutElastic',
              from: (ctx) => {
                if (ctx.type === 'data') {
                  if (ctx.mode === 'default' && !ctx.dropped) {
                    ctx.dropped = true;
                    return 0;
                  }
                }
              }
            }
          },
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'QuestionID',
              color: 'blue',
              font: {
                size: 16, // Adjust the font size as per your preference
                family: 'Varela Round', // Apply the desired font style
                weight: 'bold', // Apply the desired font weight
                shadowColor: 'rgba(0, 0, 0, 1)', // Set the shadow color
                shadowBlur: 5, // Set the shadow blur radius
              },
            },
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Activity (Answers+Comments)',
              color: 'red',
              font: {
                size: 16, // Adjust the font size as per your preference
                family: 'Varela Round', // Apply the desired font style
                weight: 'bold', // Apply the desired font weight
                shadowColor: 'rgba(0, 0, 0, 0.5)', // Set the shadow color
                shadowBlur: 5, // Set the shadow blur radius
              },
            },
          },
        },
      };
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Count',
            data: [],
            backgroundColor: 'red',
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
    });

  useEffect(() => {

    const fetchData = async () => {
      const res = await axios.get('/api/question/topQuestions');
      const questions = res.data;
        console.log("questions", questions)
      setChartData({
        labels: questions.map(q => q._id.substring(0,6)),
        datasets: [{
          label: 'Activity',
          data: questions.map(q => q.activity),
          backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)','rgba(255, 99, 132, 1)'],
              borderWidth: 1 
        }]
      })
    };

    fetchData();

  }, []);
  return (
    <div style={{ padding: '20px', margin: 'auto', width: '70%', height: '70%' }}>
      <h2 style={{size: '10px'}}>Most Popular Questions</h2>
        <Bar data={chartData} options={optionsbar} />      
      </div>
  )
}

export default BarChart;