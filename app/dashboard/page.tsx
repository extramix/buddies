import { CategoryBreakdown } from '@/components/CategoryBreakdown';
import { ExpenseOverview } from '@/components/ExpenseOverview';
import { TransactionTable } from '@/components/TransactionTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionModal } from '@/components/TransactionModal';

export default async function Dashboard() {
  const transcations = await fetch(`http://localhost:8888/transactions`).then(
    (res) => res.json()
  );

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
      <TransactionTable transactions={transcations} />
    </div>
  );
}
