'use client';
import { useState } from 'react';
import { Calendar } from './ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

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
      <Table className='p-10'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Amout</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className='text-right'>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-medium'>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className='text-right'>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
