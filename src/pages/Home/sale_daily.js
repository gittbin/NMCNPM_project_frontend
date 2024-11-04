import React from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Tự động đăng ký các thành phần biểu đồ

function Sales_daily() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const data = {
        labels: ['March 25', 'March 26', 'March 27', 'March 28', 'March 29', 'March 30', 'March 31', 'April 01', 'April 02'],
        datasets: [
            {
                data: [4300, 4600, 4700, 4500, 4400, 4800, 4200, 4100],
                borderColor: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return (
        <Box
            sx={{
                backgroundColor: '#1e88e5',
                color: '#fff',
                borderRadius: 2,
                padding: 3,
                textAlign: 'center',
                width: '100%', // Cho phép mở rộng toàn bộ chiều rộng của phần tử cha
                position: 'relative',
            }}
        >
            <Typography variant="h6">Daily Sales</Typography>
            <Typography variant="body2">March 25 - April 02</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 1 }}>$4,578.58</Typography>

            <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    padding: '4px 8px',
                    minWidth: 'auto',
                    fontSize: '0.75rem',
                    '&:hover': { backgroundColor: '#1565c0' },
                }}
            >
                Export
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <MenuItem onClick={handleClose}>Export as CSV</MenuItem>
                <MenuItem onClick={handleClose}>Export as PDF</MenuItem>
            </Menu>

            <Box sx={{ marginTop: 3, width: '100%' }}> {/* Đặt width=100% cho biểu đồ */}
                <Line
                    data={data}
                    options={{
                        plugins: { legend: { display: false } },
                        scales: { x: { display: false }, y: { display: false } },
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </Box>
        </Box>
    );
}

export default Sales_daily;
