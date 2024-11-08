import React from 'react';
import { Box, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function UsersOnlineCard() {
    const data = {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
            {
                data: [10, 12, 15, 13, 14, 16, 17],
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.2)',
                pointBackgroundColor: '#ff5722',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: 2,
                padding: 2,
width: '100%',
                textAlign: 'left',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 'bold', }}>17</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Users online</Typography>
            <Typography variant="h6" sx={{ color: '#1e88e5', fontWeight: 'bold', position: 'absolute', top: 16, right: 16 }}>
                +5%
            </Typography>

            <Box sx={{ marginTop: 2, height: 60 }}>
                <Line data={data} options={options} />
            </Box>
        </Box>
    );
}

export default UsersOnlineCard;
