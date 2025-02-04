import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Progress } from './ui/progress';

const budgets = [
  {
    category: 'Food & Drinks',
    spent: 1200,
    total: 2000,
    progress: 60,
  },
  {
    category: 'Shopping',
    spent: 500,
    total: 1000,
    progress: 50,
  },
  {
    category: 'Housing',
    spent: 1000,
    total: 2000,
    progress: 50,
  },
  {
    category: 'Transportation',
    spent: 200,
    total: 500,
    progress: 40,
  },
];

export const BudgetSummary: React.FC = () => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
        <CardDescription>Your monthly budget progress.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {budgets.map((budget) => (
          <div key={budget.category} className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium'>{budget.category}</span>
              <span className='text-muted-foreground'>
                ${budget.spent} / ${budget.total}
              </span>
            </div>
            <Progress value={budget.progress} className='h-2' />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
