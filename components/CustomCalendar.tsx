'use client';
import { useState } from 'react';
import { Calendar } from './ui/calendar';

export const CustomCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className='flex gap-3'>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border'
      />
    </div>
  );
};
