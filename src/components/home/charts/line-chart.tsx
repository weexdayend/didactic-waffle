"use client"

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import React from "react";

interface ExampleProps {
  title: string;
  colorAlokasi: string;
  colorRealisasi: string;
  alokasi: any;
  realisasi: any;
}

const Example: React.FC<ExampleProps> = ({ title, colorAlokasi, colorRealisasi, alokasi, realisasi }: ExampleProps) => {
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
            labels: ["UREA", "NPK", "KHUSUS"],
            datasets: [{
              data: alokasi,
              label: `${title}`,
              backgroundColor: `${colorAlokasi}`,
              borderRadius: 10,
            },{
              data: realisasi,
              label: `${title}`,
              backgroundColor: `${colorRealisasi}`,
              borderRadius: 10,
            }]
          },
          options: {
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false,
              }
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
                  display: true
                },
                grid: {
                  display: false
                },
                display: true,
                stacked: false,
              },
              y: {
                ticks: {
                  display: false
                },
                grid: {
                  display: false
                },
                display: false,
                stacked: false,
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
      <div className="flex w-full h-full border rounded-3xl items-center justify-center">
        <div className='w-[270px] h-fit flex flex-col items-center justify-between gap-12 py-6'>
          <h1>Diagram Distribusi</h1>
          <canvas width={200} ref={chartRef}></canvas>
          <div className='flex flex-row w-full items-center justify-center gap-8'>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-6 h-3 rounded-full bg-blue-400' />
              <h6 className='text-sm'>(Alokasi)</h6>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <div className='w-6 h-3 rounded-full bg-green-400' />
              <h6 className='text-sm'>(Realisasi)</h6>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Example;
