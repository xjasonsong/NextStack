"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

interface LoadingButtonProps extends ButtonProps {
  loadingText?: React.ReactNode;
  loadingIndicator?: React.ReactNode;
  loadingIndicatorClassName?: string;
  children: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      className,
      variant,
      size,
      loadingText,
      loadingIndicator,
      loadingIndicatorClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    const defaultLoadingIndicator = (
      <span
        className={cn(
          "h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent",
          loadingIndicatorClassName,
        )}
      />
    );

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("", className)}
        aria-disabled={pending}
        {...props}
      >
        {pending ? (
          <>
            {loadingIndicator ?? defaultLoadingIndicator}
            <span className="ml-2">{loadingText ?? children}</span>
          </>
        ) : (
          children
        )}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
