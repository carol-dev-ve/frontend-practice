import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
const PieChartEmotion = ({data}) => {
    const [dataForChart, setDataForChart] = useState({})
    useEffect(() => {
      const filterData = data.reduce((acum, res) =>({
        ...acum, 
        [res.label] : res.score
      }), {})
      setDataForChart(filterData)
    }, [data])
    const labels = Object.keys(dataForChart) || []
    
  return (
    <Pie
    data={{
        labels,
        datasets:[{
            label:`Graph for Emotion`,
            backgroundColor:['#3366cc', '#990099', '#109618', '#dc3912', '#ff9900','#3366cc', '#990099', '#109618', '#dc3912', '#ff9900' ],
            data : labels.map(key => Number(dataForChart[key]).toFixed(2)*100)
        }
        ],
         }} 
         options={{
          responsive: true,
          plugins:{
            title:{
              display: true,
              text:`Graph for Emotion in percent`,
              fontSize:14
            }
          }
         }}
    />
  )
}

export default PieChartEmotion