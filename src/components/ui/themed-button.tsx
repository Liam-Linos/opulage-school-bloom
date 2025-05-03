
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemedButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'destructive';
}

const ThemedButton = React.forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          // Default styling
          "font-medium transition-all active:scale-95",
          
          // Variant-specific styling
          variant === 'primary' && "bg-forest-600 hover:bg-forest-700 text-white",
          variant === 'secondary' && "bg-amber-400 hover:bg-amber-500 text-amber-950",
          variant === 'accent' && "bg-teal-500 hover:bg-teal-600 text-white",
          
          // Pass additional classNames
          className
        )}
        {...props}
      />
    );
  }
);

ThemedButton.displayName = 'ThemedButton';

export { ThemedButton };
