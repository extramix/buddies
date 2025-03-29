import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import FormField from "@/components/FormField"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

interface TransactionTypeTabsProps<T extends FieldValues> {
  methods: UseFormReturn<T>
  categoryOptions: { value: string; label: string }[]
}

export const TransactionTypeTabs = <T extends FieldValues & { type: string, category: string }>({ methods, categoryOptions }: TransactionTypeTabsProps<T>) => {
  return (
    <Tabs defaultValue="Expense" onValueChange={(value) => methods.setValue("type" as Path<T>, value.toLowerCase() as any)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Expense">Expense</TabsTrigger>
        <TabsTrigger value="Income">Income</TabsTrigger>
      </TabsList>
      <TabsContent value="Expense">
        <FormField
          name="category"
          type="select"
          required
          placeholder="Select a category"
          selectOptions={categoryOptions}
        />
      </TabsContent>
      <TabsContent value="Income">
        <FormField
          name="category"
          type="select"
          required
          placeholder="Select a category"
          selectOptions={categoryOptions}
        />
      </TabsContent>
    </Tabs>
  );
};

