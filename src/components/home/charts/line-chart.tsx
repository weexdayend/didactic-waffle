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
        myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Realisasi"],
            datasets: [{
              data: [86],
              label: "Alokasi",
              borderColor: "#3e95cd",
              backgroundColor: "#7bb6dd",
            }, {
              data: [700],
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
            maintainAspectRatio: true,
            layout: {
              autoPadding: false,
              padding: 0,
            },
            scales: {
              x: {
                ticks: {
                  display: false
                },
                grid: {
                  display: false
                },
                display: false,
                stacked: true,
              },
              y: {
                ticks: {
                  display: false
                },
                grid: {
                  display: false
                },
                display: false,
                stacked: true,
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
      <div className="flex w-full h-fit border rounded-3xl items-center justify-center dark:bg-white">
        <div className='w-[270px] h-fit flex flex-col items-center justify-between pt-6'>
          <h1 className='text-lg dark:text-zinc-800'>PUPUK</h1>
          <canvas width={200} ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Example;
