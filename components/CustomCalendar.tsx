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
import { TransactionsItem } from '@/types/transaction';

export type CustomCalendarProps = {
  transactions: TransactionsItem[];
};

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  transactions,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  console.log(transactions, 'transactions');
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
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className='font-medium'>
                ${transaction.amount}
              </TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.note}</TableCell>
              <TableCell className='text-right'>
                {transaction.paymentMethod}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
