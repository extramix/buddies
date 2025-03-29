'use client';

import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from './queries';
import { DashboardContent } from '@/components/Dashboard';
import { TransactionsItem } from '@/types/transaction';

const GraphqlPage = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  
  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error: {error.message}</div>;
  
  const transactions = data?.transactions || [];
  
  return (
    <div className="min-h-screen bg-background">
      <DashboardContent transactions={transactions as TransactionsItem[]} />
    </div>
  );
};

export default GraphqlPage;
