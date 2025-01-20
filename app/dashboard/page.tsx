import { CustomCalendar } from '@/components/CustomCalendar';
import { TransactionTable } from '@/components/TransactionTable';

export default async function Dashboard() {
  const transcations = await fetch(`http://localhost:8888/transactions`).then(
    (res) => res.json()
  );

  return (
    <>
      <div className='flex items-center justify-items-center'>
        <main>
          <div className='flex'>
            <CustomCalendar />
            <TransactionTable transactions={transcations} />
          </div>
        </main>
      </div>
    </>
  );
}
