import { cookies } from 'next/headers';
import { serverFetch } from '@/lib/api';
import { TransactionsItem } from '@/types/transaction';
import { DashboardContent } from '@/components/Dashboard';

export default async function Dashboard() {
  let transactions: TransactionsItem[] = [];
  
  try {
    const cookieStore = cookies();
    transactions = await serverFetch<TransactionsItem[]>('transaction/', cookieStore);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }

  return (
    <DashboardContent transactions={transactions} />
  );
}
