import { BudgetSummary } from '@/components/BudgetSummary';
import { CustomCalendar } from '@/components/CustomCalendar';
import { TransactionTable } from '@/components/TransactionTable';

export default async function Dashboard() {
  const transcations = await fetch(`http://localhost:8888/transactions`).then(
    (res) => res.json()
  );

  return (
    <div className='flex-col space-y-2 px-3 max-w-xl items-center'>
      <div className='md:flex md:space-x-2 justify-center'>
        <CustomCalendar />
        <TransactionTable transactions={transcations} />
      </div>
      <BudgetSummary />
    </div>
  );
}
