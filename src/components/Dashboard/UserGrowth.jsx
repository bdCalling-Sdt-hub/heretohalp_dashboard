import React from 'react';
import { Select } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample dropdown options
const items = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
];

// Sample chart data
const data = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 500 },
  { name: 'Apr', uv: 200 },
  { name: 'May', uv: 300 },
  { name: 'Jun', uv: 450 },
  { name: 'Jul', uv: 600 },
  { name: 'Aug', uv: 700 },
  { name: 'Sep', uv: 500 },
  { name: 'Oct', uv: 400 },
  { name: 'Nov', uv: 450 },
  { name: 'Dec', uv: 500 },
];

// Dropdown change handler
const handleChange = (value) => {
  console.log(`Selected year: ${value}`);
};

export const UserGrowth = () => {
  return (
    <div>
      <div className='flex justify-between p-3 px-7'>
        <p className='text-xl font-medium'>Earning Growth</p>
        <Select
          defaultValue="2024"
          style={{ width: 120 }}
          onChange={handleChange}
          options={items}
        />
      </div>
      <div className='w-full h-[400px]'>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#0044B4" opacity={1} fillOpacity={1} fill="#0044B4" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
