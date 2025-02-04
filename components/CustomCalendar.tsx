'use client';
import { useState } from 'react';
import { Calendar } from './ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export const CustomCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
        <CardDescription>Your monthly budget progress.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-md border'
        />
      </CardContent>
    </Card>
  );
};
