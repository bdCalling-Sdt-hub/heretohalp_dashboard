import { Select, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useGetOverviewQuery } from '../../page/redux/api/manageApi';



export const EarningGrowth = () => {
  const { data } = useGetOverviewQuery();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      // Map monthly registration data to the chart format
      const monthlyData = Object.entries(data?.data?.monthlyRegistration || {}).map(
        ([month, count]) => ({
          name: month,
          uv: count,  // Count for the month (replace "uv" with any key you prefer)
          amt: count,  // You can also use "amt" for the same count or another value
        })
      );

      setChartData(monthlyData);
    }
  }, [data]);

  return (
    <div>
      <div className="flex justify-between p-3 px-7">
        <p className="text-xl font-medium">User Growth</p>
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="uv"
              stackId="a"
              fill="#0044B4"
              radius={[25, 25, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
