import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type Option = {
  label: string;
  value: string | number;
};

type FormSelectFieldProps<T extends FieldValues> = {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  description?: string;
};

const FormSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  description,
}: FormSelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel id={`${name}-label`}>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-slate-50">
                <SelectGroup>
                  {options.map((option, index) => (
                    <SelectItem key={index} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormSelectField;
