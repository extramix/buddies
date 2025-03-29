'use client';

import { useQuery } from '@apollo/client';
import { DashboardContent } from '@/components/Dashboard';
import { TransactionsItem } from '@/types/transaction';
import { GET_TRANSACTIONS } from './queries';

const GraphqlPage = () => {
  const { loading, error, data } = useQuery<{ transactions: TransactionsItem[] }>(GET_TRANSACTIONS);
  
  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error: {error.message}</div>;
  
  const transactions = data?.transactions || [];
  
  return (
      <DashboardContent transactions={transactions} />
  );
};

export default GraphqlPage;
