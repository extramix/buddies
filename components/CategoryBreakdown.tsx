'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Shopping', value: 200 },
  { name: 'Bills', value: 278 },
  { name: 'Others', value: 189 },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function CategoryBreakdown() {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[200px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey='value'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
