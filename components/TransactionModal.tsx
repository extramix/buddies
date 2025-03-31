'use client'
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormField from "@/components/FormField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionTypeTabs } from "./ui/TransactionTypeTabs";
import "./dateInputStyles.css"; // Import custom CSS for date input
import { getCsrfToken } from "@/lib/auth";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS, GET_CATEGORIES } from "@/app/dashboard/graphql/queries";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.string().min(1, "Amount is required").refine(val => !isNaN(parseFloat(val)), { message: "Amount must be a number" }),
  category: z.string().min(1, "Category is required"),
  account: z.string().min(1, "Account is required"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["expense", "income"]),
});

type FormValues = z.infer<typeof schema>;

const typeOptions = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];

export function TransactionModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      type: "expense",
    },
  });

  const { handleSubmit, formState: { isSubmitting }, reset } = methods;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'n') {
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    const submittedData = {
      ...data,
      amount: parseFloat(data.amount)
    };

    try {
      const response = await fetch('http://localhost:8000/api/transaction/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        credentials: 'include',
        body: JSON.stringify(submittedData),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      // Close the modal and reset form on successful submission
      setOpen(false);
      reset();
    } catch (error) {
      console.error('Error adding transaction:', error);
      // You could add error handling UI here
    }
  };

  const { data: accounts } = useQuery(GET_ACCOUNTS);
  const { data: categories, loading: categoriesLoading } = useQuery(GET_CATEGORIES, {
    variables: {
      type: methods.watch("type"),
    }
  });


  const categoryOptions = categories?.categories?.[methods.watch("type")]?.map((category: { id: number, name: string }) => ({
    value: category.id.toString(),
    label: category.name
  })) || [];

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) {
        reset();
      }
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                <span className="block mt-1 text-xs text-muted-foreground">
                  Tip: Press <kbd className="px-1 py-0.5 text-xs font-semibold border rounded-md">N</kbd> to quickly open this modal.
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <FormField
                name="date"
                label="Date"
                type="date"
                required
                className="date-input-custom"
              />
              <FormField name="title" label="Title" required placeholder="Enter transaction title" />
              <FormField name="account" label="Account" type="select" defaultValue={accounts?.accounts[0].id}
                selectOptions={accounts?.accounts?.map((account: { id: number, name: string }) => ({
                  value: account.id.toString(),
                  label: account.name
                })) || []}
                required placeholder="Enter transaction account" />

              <div className="flex w-full gap-x-1">
                <div>
                  <FormField
                    name="amount"
                    label="How much?"
                    type="number"
                    required
                    placeholder="¥"
                    min="0"
                    step="100.00"
                  >
                    {[100, 500, 1000].map((amount) => (
                      <Button
                        key={amount}
                        className="text-xs"
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault()
                          methods.setValue("amount", amount.toString())
                        }}
                      >
                        ¥{amount}
                      </Button>
                    ))}
                  </FormField>

                </div>

                <div>
                  <FormField
                    name="type"
                    label="Transaction Type"
                    type="text"
                    customInput={
                      <TransactionTypeTabs
                        methods={methods}
                        categoryOptions={categoryOptions}
                      />
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Adding..." : "Add Transaction"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
} 