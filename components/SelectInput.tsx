import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ComponentProps } from "react";
interface SelectInputProps<T> {
  field: T;
  selectOptions: { value: string; label: string }[];
  defaultPlaceholder: string;
  defaultValue?: string;
}

export const SelectInput = <T extends { onChange: (value: string) => void, value: string }>({ field, selectOptions, defaultPlaceholder, defaultValue }: SelectInputProps<T>) => {
  return <Select onValueChange={field.onChange} defaultValue={defaultValue}>
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
};
