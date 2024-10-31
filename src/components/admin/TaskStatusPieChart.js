// src/components/TaskStatusPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const TaskStatusPieChart = () => {
    const data = {
        labels: ['Создана', 'В работе', 'Завершена', 'Оплачена'],
        datasets: [
            {
                label: 'Распреденение заказов по статусу',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
                data: [4, 1, 1, 1], // Sample data for tasks by status
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Распреденение заказов по статусу',
                fontSize: 16,
            },
            legend: {
                display: true,
                position: 'right',
            },
        },
    };

    return (
        <div>
            <Pie data={data} options={options} />
        </div>
    );
};

export default TaskStatusPieChart;