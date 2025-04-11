import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FormDatePickerFieldProps<T extends FieldValues> = {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
};

const FormDatePickerField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Pick a date",
  description,
}: FormDatePickerFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={name}
                  aria-label={label}
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 " />
                  {field.value
                    ? format(new Date(field.value), "PPP")
                    : placeholder}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-50" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormDatePickerField;
