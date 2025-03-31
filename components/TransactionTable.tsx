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
              <TableHead>Amout</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...transactions]
              .sort((a, b) => Number(b.id) - Number(a.id))
              .map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className='font-medium'>
                    {transaction.account.currency} {transaction.amount}
                  </TableCell>
                  <TableCell className=''>
                    <Badge className='mr-2' variant='secondary'>
                      {transaction.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
