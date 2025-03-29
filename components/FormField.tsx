import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormItem, FormControl, FormDescription, FormMessage, FormLabel } from "@/components/ui/form";

interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'email' | 'password' | 'select';
  placeholder?: string;
  description?: string;
  required?: boolean;
  selectOptions?: { value: string; label: string }[];
  step?: string;
  min?: string;
  max?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  description,
  required,
  selectOptions,
  step,
  min,
  max
}) => {
  const { control, formState: { errors } } = useFormContext();
  const defaultPlaceholder = placeholder || `Enter ${label.toLowerCase()}`;

  return (
    <FormItem>
      <FormLabel>{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            if (type === 'select') {
              return (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={defaultPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }
            return (
              <Input
                type={type}
                placeholder={defaultPlaceholder}
                step={type === 'number' ? step || 'any' : undefined}
                {...field}
                value={type === 'date' && !field.value ? '' : field.value}
                min={min}
                max={max}
              />
            );
          }}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{errors[name]?.message as string}</FormMessage>
    </FormItem>
  );
};

export default FormField; 