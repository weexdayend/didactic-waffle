"use client"

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import React from "react";

interface ExampleProps {
  // Define props if any
}

const Example: React.FC<ExampleProps> = () => {
  const chartRef = useRef<HTMLCanvasElement>(null); // Ref to hold canvas element

  useEffect(() => {
    let myChart: Chart | null = null; // Declare myChart as Chart | null

    // Ensure chartRef.current is not null before attempting to create chart
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // Destroy existing chart if it exists

        // Create new chart
        myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Sunday"],
            datasets: [{
              data: [86],
              label: "Alokasi",
              borderColor: "#3e95cd",
              backgroundColor: "#7bb6dd",
            }, {
              data: [70],
              label: "Realisasi",
              borderColor: "#3cba9f",
              backgroundColor: "#71d1bd",
            }]
          },
          options: {
            plugins: {
              title: {
                display: false,
              },
            },
            responsive: true,
            scales: {
              x: {
                ticks: {
                  display: false
                },
                grid: {
                  display: false
                },
                display: false,
              },
              y: {
                ticks: {
                  display: false
                },
                grid: {
                  display: false
                },
                display: false,
              }
            }
          }
        });
      }
    }

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex mx-auto my-auto">
      <div className='pt-6 border rounded-3xl w-full h-full flex flex-col items-center justify-center'>
        <h1>PUPUK</h1>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Example;
