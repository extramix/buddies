import { CustomCalendar } from '@/components/CustomCalendar';

export default async function Dashboard() {
  const transcations = await fetch(`http://localhost:8888/transactions`).then(
    (res) => res.json()
  );

  return (
    <>
      <div className='flex items-center justify-items-center'>
        <main>
          <CustomCalendar transactions={transcations} />
        </main>
      </div>
    </>
  );
}
