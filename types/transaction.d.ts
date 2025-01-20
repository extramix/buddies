export interface Transactions {
  users: User[];
  defaultCategories: DefaultCategoriesItem[];
  userCategories: UserCategoriesItem[];
  transactions: TransactionsItem[];
  budgets: BudgetsItem[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  currency: string;
}

export interface DefaultCategoriesItem {
  id: number;
  name: string;
  icon: string;
  userId: number;
}

export interface UserCategoriesItem {
  id: number;
  name: string;
  icon: string;
  userId: number;
}

export interface TransactionsItem {
  id: number;
  categoryId: number;
  amount: number;
  date: string;
  note: string;
  userId: number;
  paymentMethod: string;
}

export interface BudgetsItem {
  id: number;
  categoryId: number;
  amount: number;
  userId: number;
  startDate: string;
  endDate: string;
}
