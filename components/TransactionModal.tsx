"use client";

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

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.string().min(1, "Amount is required").refine(val => !isNaN(parseFloat(val)), { message: "Amount must be a number" }),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["expense", "income"]),
});

type FormValues = z.infer<typeof schema>;

const categoryOptions = [
  { value: "food", label: "Food" },
  { value: "transportation", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities", label: "Utilities" },
  { value: "housing", label: "Housing" },
  { value: "other", label: "Other" },
];

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
    
  };

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
              <FormField name="title" label="Title" required placeholder="Enter transaction title" />

              <FormField 
                name="amount" 
                label="Amount" 
                type="number" 
                required 
                placeholder="¥"
                min="0"
                step="100.00" 
              />

              <FormField
                name="category"
                label="Category"
                type="select"
                required
                placeholder="Select a category"
                selectOptions={categoryOptions}
              />
              
              <FormField 
                name="date" 
                label="Date" 
                type="date" 
                required 
              />

              <FormField
                name="type"
                label="Type"
                type="select"
                required
                placeholder="Select type"
                selectOptions={typeOptions}
              />
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