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

export interface Category {
  id: number;
  name: string;
  type: string;
}

export interface Account {
  id: number;
  name: string;
 currency: string;
}

export interface TransactionsItem {
  id: number;
  category: Category;
  account: Account;
  amount: number;
  date: string;
  description: string;
  userId: number;
}

export interface BudgetsItem {
  id: number;
  categoryId: number;
  amount: number;
  userId: number;
  startDate: string;
  endDate: string;
}
