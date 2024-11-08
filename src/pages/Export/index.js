import Billing from '../../components/export/main'
function Export(){
    return(
      <>
        <Billing />
      </>
    )
  }
  
  export default Export;
// import React from 'react';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// const data = [
//   { name: 'Jan', Subscribers: 270, 'New Visitors': 150, 'Active Users': 542 },
//   { name: 'Feb', Subscribers: 310, 'New Visitors': 180, 'Active Users': 520 },
//   { name: 'Mar', Subscribers: 350, 'New Visitors': 200, 'Active Users': 560 },
//   { name: 'Apr', Subscribers: 330, 'New Visitors': 220, 'Active Users': 480 },
//   { name: 'May', Subscribers: 450, 'New Visitors': 260, 'Active Users': 550 },
//   { name: 'Jun', Subscribers: 400, 'New Visitors': 290, 'Active Users': 580 },
//   { name: 'Jul', Subscribers: 460, 'New Visitors': 320, 'Active Users': 620 },
//   { name: 'Aug', Subscribers: 510, 'New Visitors': 340, 'Active Users': 680 },
//   { name: 'Sep', Subscribers: 252, 'New Visitors': 360, 'Active Users': 740 },
//   { name: 'Oct', Subscribers: 680, 'New Visitors': 390, 'Active Users': 820 },
//   { name: 'Nov', Subscribers: 780, 'New Visitors': 420, 'Active Users': 890 },
//   { name: 'Dec', Subscribers: 900, 'New Visitors': 450, 'Active Users': 980 }
// ];

// const Export = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <AreaChart data={data}>
//   <XAxis dataKey="name" />
//   <YAxis type="number" domain={[0, 'dataMax']} />
//   <CartesianGrid strokeDasharray="3 3" />
//   <Tooltip />
//   <Legend />
//   <Area type="monotone" dataKey="New Visitors" stroke="#ffa726" fill="#1e88e5" fillOpacity={0.8} />
//   <Area type="monotone" dataKey="Subscribers" stroke="#ff6b6b" fill="red" fillOpacity={0.6} />
//   <Area type="monotone" dataKey="Active Users" stroke="#2196f3" fill="#0277bd" fillOpacity={0.4} />
// </AreaChart>
//     </ResponsiveContainer>
//   );
// };

// export default Export;