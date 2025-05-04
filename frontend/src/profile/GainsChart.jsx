import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

let workouts = ["Bench Press", "Squats", "Bizep Curls", "Shoulder Press", "Deadlifts", "Leg Press"];

const GainsChart = () => {
    const data = {
        labels: workouts,
        datasets: [
            {
                label: "Max Weight (PR) in kg",
                data: workouts.map(() => Math.floor(Math.random() * 100) + 50), // Random data for the sake of example
                //data: [150, 200, 170, 220, 300, 250],
                backgroundColor: "rgba(192, 75, 120, 0.7)",
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: "Gains over current Month" }
        },
        scales: {
            x: {
                tooltip: { enabled: true },
                title: { display: true, text: "Exercise" }
            },
            y: {
                tooltip: { enabled: true },
                title: { display: true, text: "Max Weight (PR)" }
            }
        }
    };

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default GainsChart;