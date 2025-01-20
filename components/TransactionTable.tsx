import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { TransactionsItem } from '@/types/transaction';

export type TransactionTableProps = {
  transactions: TransactionsItem[];
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  console.log(transactions, 'transactions');
  return (
    <Table className='p-10 w-full'>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className='w-[100px]'>Amout</TableHead>
          <TableHead>Note</TableHead>
          <TableHead className='text-right'>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell className='font-medium'>${transaction.amount}</TableCell>
            <TableCell>{transaction.note}</TableCell>
            <TableCell className='text-right'>
              {transaction.paymentMethod}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
