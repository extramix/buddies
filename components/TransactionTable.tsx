import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
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

const getCategoryName = (id: number) => {
  switch (id) {
    case 1:
      return 'Food & Drinks';
    case 2:
      return 'Shopping';
    case 3:
      return 'Housing';
    case 4:
      return 'Transportation';
    default:
      return 'Others';
  }
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  console.log(transactions, 'transactions');
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Budget Breakdown</CardTitle>
        <CardDescription>Your monthly budget progress.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Table className='p-10 w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className='w-[100px]'>Amout</TableHead>
              <TableHead className=''>Category</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className='font-medium'>
                  ${transaction.amount}
                </TableCell>
                <TableCell className=''>
                  <Badge className='mr-2' variant='secondary'>
                    {getCategoryName(transaction.categoryId)}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
