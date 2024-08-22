import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';

// Custom Bar Shape
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}L${x + width},${y + height}L${x + width / 2},${y}Z`;
};

const CustomBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} fill={fill} />;
};

// Chart Component
const Chart = () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/admin`);

        const groupedData = response.data.reduce((acc, user) => {
          const date = new Date(user.lastLoginDate);
          const year = date.getFullYear();
          const month = date.toLocaleString('default', { month: 'short' });

          if (!acc[year]) {
            acc[year] = {};
          }
          if (!acc[year][month]) {
            acc[year][month] = 0;
          }
          acc[year][month] += 1;

          return acc;
        }, {});

        const formattedChartData = Object.keys(groupedData).map(year => {
          const monthlyData = groupedData[year];
          return {
            year: year,
            months: [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ].map(month => ({
              month: month,
              users: monthlyData[month] || 0,
            }))
          };
        });

        const newChartData = formattedChartData.flatMap(yearData => 
          yearData.months.map(monthData => ({
            year: yearData.year,
            month: monthData.month,
            users: monthData.users
          }))
        );

        setChartData(newChartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  // Generate random colors for the bars
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            backgroundColor: '#fff',
            padding: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, auto)',
            columnGap: '10px'
          }}
          itemStyle={{
            display: 'inline-block',
            margin: '0',
            padding: '5px',
            whiteSpace: 'nowrap'
          }}
        />
        <Legend />
        <Bar dataKey="users" fill="#8884d8" shape={<CustomBar />}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
