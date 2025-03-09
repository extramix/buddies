import { Control, Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItem, FormControl, FormDescription, FormMessage, FormLabel } from "@/components/ui/form"; 

interface FormFieldProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, description, required }) => {
  const { control, formState: { errors } } = useFormContext();

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
      {errors[name] && typeof errors[name] === 'object' && 'message' in errors[name] && (
        <FormMessage>{errors[name].message as string}</FormMessage>
      )}
    </FormItem>
  );
};

export default FormField; 