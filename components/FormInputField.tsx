import { HTMLInputTypeAttribute, useMemo } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FormInputFieldProps<T extends FieldValues> = {
  control: UseFormReturn<T>["control"]; // ✅ ส่งเฉพาะ `control`
  name: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  description?: string;
};

const FormInputField = <T extends FieldValues>({
  control,
  name,
  label,
  type,
  placeholder,
  description,
}: FormInputFieldProps<T>) => {
  return (
    <FormField
      control={control} // ✅ ใช้เฉพาะ `control`
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputField;
