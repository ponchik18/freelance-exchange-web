import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const RevenueChart = () => {
    const data = {
        labels: ['Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
        datasets: [
            {
                label: 'Прибыль',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: [0, 0, 0, 120, 2540, 4560], // Sample revenue data
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category', // Setting the x-axis scale type to 'category'
                title: {
                    display: true,
                    text: 'Месяц',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Прибыль',
                },
            },
        },
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Прибыль по месяцам</h2>
            <Bar data={data}  options={options}/>
        </div>
    );
};

export default RevenueChart;