'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from 'lucide-react';

export function ExpenseOverview() {
  return (
    <div className='grid gap-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Expenses</CardTitle>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>$1,234.56</div>
          <p className='text-xs text-muted-foreground'>
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Monthly</CardTitle>
            <ArrowUpIcon className='h-4 w-4 text-destructive' />
          </CardHeader>
          <CardContent>
            <div className='text-xl font-bold'>$654.32</div>
            <p className='text-xs text-muted-foreground'>
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Daily Avg</CardTitle>
            <ArrowDownIcon className='h-4 w-4 text-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-xl font-bold'>$21.81</div>
            <p className='text-xs text-muted-foreground'>-4% from last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
