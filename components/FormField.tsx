import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormItem, FormControl, FormDescription, FormMessage, FormLabel } from "@/components/ui/form";
import { SelectInput } from "./SelectInput";

interface FormFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'number' | 'date' | 'email' | 'password' | 'select';
  children?: React.ReactNode;
  placeholder?: string;
  description?: string;
  required?: boolean;
  selectOptions?: { value: string; label: string }[];
  step?: string;
  min?: string;
  max?: string;
  customInput?: React.ReactNode;
  className?: string;
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
  max,
  children,
  customInput,
  className,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const defaultPlaceholder = placeholder || `Enter ${label?.toLowerCase() || ''}`;

  return (
    <FormItem>
      {label && (
        <FormLabel>{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
      )}
      <FormControl>
        {customInput ? (
          customInput
        ) : (
          <Controller
            name={name}
            control={control}
            render={({ field }) => {
              if (type === 'select') {
                return (
                  <SelectInput field={field} selectOptions={selectOptions || []} defaultPlaceholder={defaultPlaceholder} />
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
                  className={className}
                />
              );
            }}
          />
        )}
      </FormControl>
      {children}
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{errors[name]?.message as string}</FormMessage>
    </FormItem>
  );
};

export default FormField; 