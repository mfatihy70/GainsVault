import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

// Register the required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

let workouts = ["Bench Press", "Squats", "Bizep Curls", "Shoulder Press", "Deadlifts", "Leg Press"];

import ChartDataLabels from 'chartjs-plugin-datalabels';

const gainLossRate = workouts.map(() => Math.floor(Math.random() * 100) - 50);
const lastPr = workouts.map(() => Math.floor(Math.random() * 100) + 50); // Random data for the sake of example
const currPr = workouts.map((_, index) => (lastPr[index] + gainLossRate[index])); // Random data for the sake of example

const topLabel = {
    id: 'topLabel',
    afterDatasetsDraw(chart, AbortSignal, pluginOptions) {
        const { ctx, legend, scales: { x, y } } = chart;
        chart.data.datasets[0].data.forEach((value, index) => {
            const datasetArray = [];
            chart.data.datasets.forEach((dataset, i) => {
                datasetArray.push(dataset.data[index]);
            });

            let sum = lastPr[index] + gainLossRate[index];
            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.textAlign = 'center';

            // Show only gain or loss rate
            if (legend.legendItems[0].hidden) {
                sum = gainLossRate[index];
            }
            // Show only personal record
            else if (legend.legendItems[1].hidden) {
                sum = lastPr[index];
            }
            else {
                sum = "";
            }
            //ctx.fillText(sum, x.getPixelForValue(index), chart.getDatasetMeta(1).data[index].y - 20);
        });
    }
};


// Function to assign color based on value
const getColor = (value) => {
    if (value < 0) return '#ef5350';      // red for high
    return '#66bb6a';                    // green for low
};

const GainsChart = () => {
    const data = {
        labels: workouts,
        datasets: [
            {
                label: "Last Month",
                data: lastPr,
                backgroundColor: '#00bcd4',
            },
            {
                label: "PR Gain/Loss",
                data: gainLossRate, // Random data for the sake of example
                backgroundColor: gainLossRate.map(getColor),
            },
            {
                stack: "Stack 0",
                label: "Current Month",
                data: currPr, // Random data for the sake of example
                backgroundColor: '#ff9800',
            },

        ]
    };

    const options = {
        responsive: true,
        plugins: {

            title: { display: true, text: "PR Gain/Loss over current Month" },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        // Gain/Loss label
                        if (tooltipItem.datasetIndex === 1) {
                            const gain = gainLossRate[tooltipItem.dataIndex];
                            if (gain < 0) {
                                return `Loss: ${Math.abs(tooltipItem.raw)} kg`; // Show the absolute value for losses
                            }
                            return `Gain: ${tooltipItem.raw} kg`; // Show the value for gains
                        }
                        // Last Month PR label
                        if (tooltipItem.datasetIndex === 0) {
                            const last_pr = lastPr[tooltipItem.dataIndex];
                            return `Last Month PR: ${last_pr} kg`;
                        }
                        // Current Month PR label
                        if (tooltipItem.datasetIndex === 2) {
                            const last_pr = lastPr[tooltipItem.dataIndex];
                            return `Current Month PR: ${last_pr} kg`;
                        }
                    }
                }
            },
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 12,
                },
                anchor: (context) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 10 ? 'end' : 'center';  // outside for small bars
                },
                align: (context) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 10 ? 'top' : 'center';
                },
                offset: (context) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 10 ? 4 : 0;
                },
                formatter: (value, context) => {
                    //if (context.datasetIndex === 1) {
                    //    const gain = gainLossRate[context.dataIndex];
                    //    return gain > 0 ? `+${gain}` : `${gain}`;
                    //}
                    //if (context.datasetIndex === 0) {
                    //    //const pr = lastPr[context.dataIndex] + gainLossRate[context.dataIndex];
                    //    const pr = lastPr[context.dataIndex];
                    //    return `${pr}`;
                    //}
                },
                clip: false, // ensure labels outside the canvas still render
            },
        },

        scales: {
            x: {
                stacked: true,
                tooltip: { enabled: true },
                title: { display: true, text: "Exercise" }
            },
            y: {
                stacked: true,
                grace: 50,
                beginAtZero: true,      // always starts from 0
                //min: 0,                 // minimum value of the axis
                //max: 400,               // maximum value of the axis
                ticks: {
                    //padding: 10,
                    //stepSize: 10,         // gap between tick marks
                    callback: (value) => `${value} kg`, // optional formatting
                },
                tooltip: { enabled: true },
                title: { display: true, text: "Max Weight (PR)" }
            }
        },
    };

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <Bar data={data} options={options} plugins={[topLabel]} />
        </div>
    );
};

export default GainsChart
