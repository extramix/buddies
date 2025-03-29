import { CategoryBreakdown } from '@/components/CategoryBreakdown';
import { ExpenseOverview } from '@/components/ExpenseOverview';
import { TransactionTable } from '@/components/TransactionTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionModal } from '@/components/TransactionModal';
import { cookies } from 'next/headers';
import { serverFetch } from '@/lib/api';
import { TransactionsItem } from '@/types/transaction';

export default async function Dashboard() {
  let transactions: TransactionsItem[] = [];
  
  try {
    const cookieStore = cookies();
    transactions = await serverFetch<TransactionsItem[]>('transaction/', cookieStore);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }

  return (
    <div className='flex flex-col space-y-6 px-2 md:px-8 max-w-7xl w-full mx-auto my-5'>
      <div>
        <h1 className='text-3xl font-semibold mb-5'>Dashboard</h1>
        <TransactionModal>
          <Button>
            <Plus /> Add
          </Button>
        </TransactionModal>
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        <ExpenseOverview />
        <CategoryBreakdown />
      </div>
      <TransactionTable transactions={transactions} />
    </div>
  );
}
