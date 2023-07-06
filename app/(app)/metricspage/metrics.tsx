import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import 'daisyui/dist/full.css';

function StyledBoxes() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartElement = chartRef.current.getContext('2d');
    new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Performance',
          data: [8, 12, 10, 6, 14],
          backgroundColor: '#6366F1',
          borderColor: '#4F46E5',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="box bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="text-gray-600 text-sm mb-2">Performance over Time</div>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="box">
        <div className="highlight-box p-6">
          <div className="icon bg-gray-800 w-12 h-12 rounded-full"></div>
          32 filler words
          <div className="text-sm text-gray-600">used on average per answer</div>
        </div>
      </div>
      <div className="box">
        <div className="highlight-box p-6">
          <div className="icon bg-gray-800 w-12 h-12 rounded-full"></div>
          15 seconds
          <div className="text-sm text-gray-600">average pause before response</div>
        </div>
      </div>
      <div className="box">
        <div className="highlight-box p-6">
          <div className="icon bg-gray-800 w-12 h-12 rounded-full"></div>
          coming soon
          <div className="text-sm text-gray-600">2</div>
        </div>
      </div>
      <div className="box">
        <div className="highlight-box p-6">
          <div className="icon bg-gray-800 w-12 h-12 rounded-full"></div>
          <ul>
            <li>You used "right" 52% of the time</li>
            <li>You used "yeah" 31% of the time</li>
          </ul>
        </div>
      </div>
      <div className="box">
        <div className="highlight-box p-6">
          <div className="icon"></div>
          3 mins 12 secs is your avg response time
        </div>
      </div>
      <div className="box">
        <div className="highlight-box p-6">
          <div className="icon"></div>
          coming soon
        </div>
      </div>
    </div>
  );
}

export default StyledBoxes;
