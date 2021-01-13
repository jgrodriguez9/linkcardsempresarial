import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import {getColors} from '../utils/getColors';

function PieChartComponent({auth, tarjetasLugar}){
    const data = tarjetasLugar.map(item => ({
      name: item.ciudad,
      value: item.cantidad
    }))
    const COLORS = getColors(tarjetasLugar);

    return (
    	<PieChart width={400} height={200}>
        <Pie
          dataKey="value"
          data={data} 
          cx={60} 
          cy={80} 
          innerRadius={50}
          outerRadius={60} 
          fill="#8884d8"
          paddingAngle={0}
        >
        	{
          	data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
        
      </PieChart>
    );

}

export default PieChartComponent