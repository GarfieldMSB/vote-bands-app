import React, { useContext, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

import { SocketContext } from '../context/SocketContext';
Chart.register(...registerables);

export const BandChart = () => {

    let myChart;

    const {socket} = useContext(SocketContext)

    // Escuchar cualquier cambio que el servidor emita en current-bands
    useEffect(() => {
        socket.on('current-bands', (bands) => {
            createChart(bands)
        })

    }, [socket]);

    const createChart = (bands = []) => {
        const ctx = document.getElementById('myChart');

        if (typeof myChart !== "undefined") myChart.destroy();

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map( band => band.name),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map( band => band.votes),
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


    return (
        <canvas id="myChart"></canvas>
    )
}
