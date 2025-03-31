'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface CategoryBreakdownProps {
  data: { name: string, value: number }[];
}

const COLORS = [
  '#E6A8D7',
  '#A8CFE7',
  '#B8E6B3',
  '#F7D6A6',
  '#E6B3B3',
  '#FFB3BA',
];

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  return (
    <Card className='col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-2xl font-semibold text-gray-800'>Categories</CardTitle>
        <CardDescription className='text-gray-600'>Your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={50}
                outerRadius={100}
                paddingAngle={3}
                dataKey='value'
                strokeWidth={2}
                stroke="#ffffff"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
