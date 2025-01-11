import React from 'react';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from "../context/globalContext.js";

ChartJs.register(ArcElement, Tooltip, Legend);

const categoryStyles = {
    'Bank Transfer': { background: '#E9D5FF', icon: '#6B21A8' },
    'Education': { background: '#AFD3E9', icon: '#1B4965' },
    'Groceries': { background: '#B5CFBB', icon: '#354F52' },
    'Health': { background: '#FFBCBE', icon: '#C81D25' },
    'Subscriptions': { background: '#D3C3E7', icon: '#543C91' },
    'Food': { background: '#FBCBAE', icon: '#DC2F02' },
    'Shopping': { background: '#FAF7B6', icon: '#7A653B' },
    'Traveling': { background: '#BDE6EE', icon: '#057874' },
    'Other': { background: '#E8E8E8', icon: '#7A7A7A' },
};

function PieChart() {
    
    const { getExpenses, totalExpense, expenses } = useGlobalContext();

    
    const categoryTotals = expenses.reduce((acc, { category, amount }) => {
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: Object.keys(categoryTotals).map(category => categoryStyles[category]?.background || categoryStyles['Other'].background),
            borderColor: 'transparent',
            borderWidth: 0,
        }],
    };

  
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    generateLabels: function(chart) {
                        
                        const original = ChartJs.defaults.plugins.legend.labels.generateLabels(chart);
                        

                       
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const value = dataset.data[tooltipItem.dataIndex];
                        const totalValue = dataset.data.reduce((sum, value) => sum + value, 0);
                        const percentage = ((value / totalValue) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${value} (${percentage}%)`;
                        }
                    
                }
            }
        }
    };

    return (
        <PieChartStyled>
            <h1>Spending Category Percentage</h1>
            <Pie data={data} options={options} />
        </PieChartStyled>
    );
}

const PieChartStyled = styled.div`
    max-width: 23rem;
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    height: 25rem;
    width: 100%;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    
    h1{
        font-size: 1.25rem;
        font-weight: 600;
        text-align: left;
    }
    
    
`;

export default PieChart;