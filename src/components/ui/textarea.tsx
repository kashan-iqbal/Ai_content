import * as React from "react";

import { cn } from "@/lib/utils";
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  customProp?: string; // Adding a custom prop
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className // Apply any custom class names passed as props
        )}
        ref={ref} // Forward the ref to the textarea
        {...props} // Spread any other props like `onChange`, `value`, etc.
      />
    );
  }
);

Textarea.displayName = "Textarea"; // This is recommended when using forwardRef to help with debugging

export { Textarea };
