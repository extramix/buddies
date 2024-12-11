import { CustomCalendar } from '@/components/CustomCalendar';

export default async function Dashboard() {
  const data = await fetch(`http://localhost:8888/transactions`).then((res) =>
    res.json()
  );

  return (
    <>
      <div className='flex items-center justify-items-center'>
        <main>
          {JSON.stringify(data)}
          <CustomCalendar />
        </main>
      </div>
    </>
  );
}
