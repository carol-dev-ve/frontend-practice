import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
const labels = ["Positive", "Negative", "Neutral"];

const options = {
  responsive: true,
  maintainAspectRatio:true, 
  title: {
    display: true,
    text: `Graph for Sentiment in percent`,
    fontSize:20,
    align:'center',
    position:'top'
  },
  plugins:{
    title: {
      display: true,
      text: `Graph for Sentiment in percent`,
      fontSize:20,
      align:'center',
      position:'top'
    },
  }
}

const PieChartSentiment = ({ data }) => {
  const [dataForChart, setDataForChart] = useState({
    POS: 0,
    NEG: 0,
    NEU: 0,
  });
  useEffect(() => {
    const filterData = data.reduce(
      (acum, res) => ({
        ...acum,
        [res.label]: res.score,
      }),
      {}
    );
    setDataForChart(filterData);
  }, [data]);
  console.log("dataForChart", dataForChart);


  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            label: `Graph for Emotion`,
            backgroundColor: ["#3366cc", "#990099", "#109618"],
            data: [
              Number(dataForChart.POS).toFixed(2) * 100,
              Number(dataForChart.NEG).toFixed(2) * 100,
              Number(dataForChart.NEU).toFixed(2) * 100,
            ],
          },
        ],
      }}
      options={options}
    />
  );
};

export default PieChartSentiment;
