import React, { useEffect, useState } from 'react'

import filterByProp from '../../helper/filterByProps';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const labels = ['Positive', 'Negative' , 'Neutral']
const PieChart = ({data, emotion}) => {
    const [dataForChart, setDataForChart] = useState({
        POS: [], 
        NEG:[],
        NEU: []
    })
    useEffect(() => {
        if(data) {
            const dataMapping = filterByProp(data, emotion)
            setDataForChart({...dataForChart, ...dataMapping})
        }

    }, [data, emotion])
    
console.log("dataForChart",dataForChart)
  return (
    <div>
        <Pie data={{
            labels,
            datasets:[{
                label:`Graph for ${emotion}`,
                backgroundColor:['#3366cc', '#990099', '#109618'],
                data : [dataForChart.POS?.length, dataForChart.NEG?.length, dataForChart.NEU?.length]
            }
            ]
             }} 
        />
    </div>
  )
}

export default PieChart