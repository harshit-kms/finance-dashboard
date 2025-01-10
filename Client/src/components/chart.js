import React from "react";
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext.js";

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 2).padStart(2, '0')}`;
    };

    const dataMap = new Map();

    const aggregateData = (data) => {
        data.forEach(item => {
            const month = formatDate(item.date);
            if (!dataMap.has(month)) {
                dataMap.set(month, { income: 0, expense: 0 });
            }
            dataMap.set(month, {
                income: dataMap.get(month).income + (item.type === 'income' ? item.amount : 0),
                expense: dataMap.get(month).expense + (item.type === 'expense' ? item.amount : 0)
            });
        });
    };

    aggregateData(incomes);
    aggregateData(expenses);

    const sortedLabels = Array.from(dataMap.keys()).sort(); // Sort labels as "YYYY-MM"
    const labels = sortedLabels.map(label => {
        const [year, month] = label.split('-');
        return `${new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short', year: 'numeric' })}`;
    });

    const incomeData = sortedLabels.map(label => dataMap.get(label)?.income || 0); 
    const expenseData = sortedLabels.map(label => dataMap.get(label)?.expense || 0);

    const data = {
        labels: labels,
        datasets: [
            {
                data: incomeData,
                borderColor: '#81C784',
                tension: 0.2,
                pointRadius: 0,
                pointStyle: 'circle'
            },
            {
                data: expenseData,
                borderColor: 'red',
                tension: 0.2,
                pointRadius: 0,
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: false,
                    text: 'Month'
                },
                grid: {
                    display: true,
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12,
                }
            },
            y: {
                grid: {
                    display: true,
                },
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            }
        }, 
    };

    return (
        <ChartStyled>
            <div>
                <h1>Activity Graph</h1>
                <div className="chart-container">
                    <Line data={data} options={options} />
                </div>
            </div>
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    display: flex;
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
    flex-direction: row;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 8px;
    height: 100%;
    width: 100%;
    .chart-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    h1 {
        display: flex;
        font-size: 1.25rem !important;
        font-weight: 600;
    }
    canvas {
        width: 95% !important;
        height: 90% !important;
    }
`;

export default Chart;
