import React from 'react';
import { Pie } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Charts = (props) => {
    let {confirmed,recovered,deaths} = props.data;
    let totalConfirmedCases = (confirmed)?confirmed:0;
    let totalRecoveredCases = (recovered)?recovered:0;
    let totalDeathCases = (deaths)?deaths:0;
    
    return (
        <div className={styles.container}>
            <Pie
                data = {{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'Covid-19 Cases',
                            backgroundColor: [
                                '#0a9dff',
                                '#03cc00',
                                '#ff0000'
                            ],
                            hoverBackgroundColor: [
                            '#0081d6',
                            '#00c700',
                            '#cc0000'
                            ],
                            data: [totalConfirmedCases,totalRecoveredCases,totalDeathCases]
                        }
                    ]
                }}
                options={
                    {
                        title:{
                            display:true,
                            text:'Covid-19 Cases',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }
                }
                height={500}
                width={500}
            />                
        </div>
    );
}

export default Charts;