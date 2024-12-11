//TODO: try to move state to a separate component
'use client';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <div className='flex items-center justify-items-center'>
        <main>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md border'
          />
        </main>
      </div>
    </>
  );
}
