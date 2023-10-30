import React,{useState,useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement,PointElement, LineElement } from 'chart.js';
import axios from 'axios';
import './LineChart.css'


Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);



function LineChart() {
    const lineOptions = {
        title: {
            
            display: true,
            text: 'Top Tags'
          },
        scales: {
            x: {
              ticks: {
                color: '#fff' 
              }
            },
            y: {
              ticks: {
                color: '#fff'
              }
            }
          },
        
          
        
          elements: {
            line: {
              borderColor: 'blue',
              backgroundColor: 'blue'
            },
            point: {
              backgroundColor: 'blue',
              borderColor: 'blue'
            }
          },
  
          layout: {
            padding: 20
          },
            
          
        
                
                
        
        scales:{
          xAxes:[{
            scaleLabel:{
              display:true,
              labelString:'Tag'
            }
          }],
          yAxes:[{
            scaleLabel:{
              display:true,
              labelString:'Frequency',
            }  
          }]
        }
}
const [chartData, setChartData] = useState({
    labels: [],
  datasets: [] 
});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/question/tags');
      //setChartData(res.data);
      console.log(res.data);
      const distinctTags = [];
      const parsedLabels = res.data.labels.map(label => {
        return JSON.parse(label); 
      });
parsedLabels.forEach(label => {
  label.forEach(tag => {
    if(!distinctTags.includes(tag)) {
      distinctTags.push(tag); 
    }
  });
});

// Initialize frequencies object
const frequencies = {};
distinctTags.forEach(tag => {
  frequencies[tag] = 0;
});

// Calculate frequencies
parsedLabels.forEach(label => {
  label.forEach(tag => {
    frequencies[tag]++;
  });  
});

const sortedTags = Object.entries(frequencies)
  .sort((a, b) => b[1] - a[1])
  .map(x => x[0]) 
  .slice(0, 5);

// Get only top 5 in labels
const top5labels = sortedTags;
const data = {
    labels: top5labels,
    datasets: [
      {
        label: 'Frequency',
        data: top5labels.map(tag => frequencies[tag]),
        borderColor: 'blue',
    backgroundColor: 'blue'
      }
    ]
  };
  setChartData(data)

    }
    fetchData();
  }, []);
  return (
    <div>
    {
        chartData.labels && chartData.datasets ? (  
            <div className style={{ padding: '20px', margin: 'auto', width: '60%', height: '60%' }}>
            <h2 className style={{size: '5px'}}>Most Popular Tags</h2>
              <Line data={chartData} options={lineOptions} />      
            </div>
        ) : <div>Loading...</div>
      }
      </div>
  )
}

export default LineChart