'use client';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { TransactionModal } from "./TransactionModal";
import { TransactionTable } from "./TransactionTable";
import { TransactionsItem } from "@/types/transaction";

interface DashboardProps {
  transactions: TransactionsItem[];
}

const transformCategoryData = (transactions: TransactionsItem[]): { name: string, value: number }[] => {
  try {
    const categoryData = transactions.reduce((acc, transaction) => {

      if (!transaction.category || !transaction.category.name) return acc;
      const categoryName = transaction.category.name;
      const amount = Number(transaction.amount);

      const isExpense = transaction.category.type
        ? transaction.category.type.toLowerCase() === 'expense'
        : amount < 0;

      if (!isExpense) return acc;

      if (!isNaN(amount) && amount > 0) {
        acc[categoryName] = (acc[categoryName] || 0) + amount;
      }
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(categoryData)
      .map(([name, value]) => ({
        name,
        value: Number(value.toFixed(2)),
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  } catch (error) {
    console.error("Error transforming category data:", error);
    return [];
  }
};

export const DashboardContent = ({ transactions }: DashboardProps) => {
  const categoryData = transformCategoryData(transactions);

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
      <CategoryBreakdown data={categoryData} />
      <TransactionTable transactions={transactions} />
    </div>
  );
}