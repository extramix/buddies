import { CustomCalendar } from '@/components/CustomCalendar';

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
