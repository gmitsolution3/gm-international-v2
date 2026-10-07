"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/* -------------------------------------------------------------------------- */
/*                              Form (Root Provider)                          */
/* -------------------------------------------------------------------------- */

const Form = FormProvider;

/* -------------------------------------------------------------------------- */
/*                              Form Field Context                            */
/* -------------------------------------------------------------------------- */

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Form Item Context                             */
/* -------------------------------------------------------------------------- */

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

/* -------------------------------------------------------------------------- */
/*                                  useFormField                              */
/* -------------------------------------------------------------------------- */

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField must be used within <FormField>");
  }

  if (!itemContext) {
    throw new Error("useFormField must be used within <FormItem>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

/* -------------------------------------------------------------------------- */
/*                                    FormItem                                */
/* -------------------------------------------------------------------------- */

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        data-slot="form-item"
        className={cn("space-y-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

/* -------------------------------------------------------------------------- */
/*                                    FormLabel                               */
/* -------------------------------------------------------------------------- */

type FormLabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> & {
  /** Mark the field as required (adds asterisk) */
  required?: boolean;
};

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, required, children, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        "flex items-center gap-1 text-sm font-medium leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        "data-[error=true]:text-destructive",
        className,
      )}
      htmlFor={formItemId}
      {...props}
    >
      {children}
      {required && (
        <span
          aria-hidden="true"
          className="text-destructive"
          title="This field is required"
        >
          *
        </span>
      )}
    </Label>
  );
});
FormLabel.displayName = "FormLabel";

/* -------------------------------------------------------------------------- */
/*                                  FormControl                               */
/* -------------------------------------------------------------------------- */

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      data-error={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

/* -------------------------------------------------------------------------- */
/*                                FormDescription                             */
/* -------------------------------------------------------------------------- */

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

/* -------------------------------------------------------------------------- */
/*                                  FormMessage                               */
/* -------------------------------------------------------------------------- */

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) return null;

  return (
    <p
      ref={ref}
      data-slot="form-message"
      id={formMessageId}
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium text-destructive",
        "animate-in fade-in-0 slide-in-from-top-1 duration-200",
        className,
      )}
      {...props}
    >
      {error && (
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      )}
      <span>{body}</span>
    </p>
  );
});
FormMessage.displayName = "FormMessage";

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

export type { FormLabelProps };
