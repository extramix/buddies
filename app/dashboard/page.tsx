import { CustomCalendar } from '@/components/CustomCalendar';

export default function Dashboard() {
  return (
    <>
      <div className='flex items-center justify-items-center'>
        <main>
          <CustomCalendar />
        </main>
      </div>
    </>
  );
}
