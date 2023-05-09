import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables, ChartOptions } from 'chart.js';

Chart.register(...registerables);

const data = {
  labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Ma', 'Ju', 'Ju', 'Au', 'Se', 'Oc', 'No', 'De'],
  datasets: [
    {
      label: 'Number of Sales',
      data: [20, 35, 50, 45, 60, 40, 40, 20, 50, 55, 40, 30],
      backgroundColor: '#d83333',
      barThickness: 15,
      borderWidth: 0,
      borderRadius: 10,
    },
  ],
};

const options: ChartOptions<'bar'> = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

const BarGraph: React.FC = () => {
    return (
        <div >
            <label style={{display: 'flex', alignItems: 'start', marginBottom: '40px'}}>App Usage</label>
            <Bar data={data} options={options} style={{ width: '900px', height: '150px', margin: 'auto' }}/>
        </div>
    );
};

export default BarGraph;
