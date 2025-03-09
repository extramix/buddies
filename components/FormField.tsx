import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItem, FormControl, FormDescription, FormMessage, FormLabel } from "@/components/ui/form"; // Adjust the import based on your structure

interface FormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  description?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ control, name, label, description, required }) => {
  return (
    <FormItem>
      <FormLabel>{label}{required && " *"}</FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input placeholder={label.toLowerCase()} {...field} />
          )}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export default FormField; 