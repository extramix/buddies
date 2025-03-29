'use client';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { ExpenseOverview } from "./ExpenseOverview";
import { TransactionModal } from "./TransactionModal";
import { TransactionTable } from "./TransactionTable";
import { TransactionsItem } from "@/types/transaction";

interface DashboardProps {
  transactions: TransactionsItem[];
}

export const DashboardContent = ({ transactions }: DashboardProps) => {
  return (
    <div className='flex flex-col space-y-6 px-2 md:px-8 max-w-7xl w-full mx-auto my-5'>
      <div>
        <h1 className='text-3xl font-semibold mb-5'>Dashboard</h1>
        <TransactionModal>
          <Button>
            <Plus /> Add
          </Button>
        </TransactionModal>
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        <ExpenseOverview />
        <CategoryBreakdown />
      </div>
      <TransactionTable transactions={transactions} />
    </div>
  );
};