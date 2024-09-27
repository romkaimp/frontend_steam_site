import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MyChart = (item) => {
  const costs = item.costs
  const preds = item.preds
  const times = item.times
  console.log(costs)
  // Данные для lines, объединим costs и недостающий отрезок null для preds
  const extendedCosts = costs.concat(new Array(preds.length).fill(null))
  const extendedPreds = new Array(costs.length).fill(null).concat(preds)

  const data = {
    labels: times,
    datasets: [
      {
        label: 'Price',
        data: extendedCosts,
        borderColor: 'rgb(39,85,137)',
        backgroundColor: 'rgba(109,255,255,0.2)',
        spanGaps: false, // чтобы предотвратить соединение null значений
      },
      {
        label: 'Prediction',
        data: extendedPreds,
        borderColor: 'rgb(197,54,155)',
        backgroundColor: 'rgba(109,255,255,0.2)',
        spanGaps: false, // чтобы предотвратить соединение null значений
      }
    ]
  };

  return <Line data={data} />;
};

export default MyChart;