import { CategoryBreakdown } from '@/components/CategoryBreakdown';
import { ExpenseOverview } from '@/components/ExpenseOverview';
import { TransactionTable } from '@/components/TransactionTable';

export default async function Dashboard() {
  const transcations = await fetch(`http://localhost:8888/transactions`).then(
    (res) => res.json()
  );

  return (
    <div className='flex flex-col space-y-6 px-2 md:px-8 max-w-7xl w-full mx-auto'>
      <div className='grid gap-6 md:grid-cols-2'>
        <ExpenseOverview />
        <CategoryBreakdown />
      </div>
      <TransactionTable transactions={transcations} />
    </div>
  );
}
