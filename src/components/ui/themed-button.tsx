
import React from 'react';
import { Button, ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemedButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'destructive';
}

const ThemedButton = React.forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    // Map our custom variants to button variants
    const getButtonVariant = (): ButtonProps['variant'] => {
      switch (variant) {
        case 'primary':
          return 'default';
        case 'secondary':
          return 'secondary';
        case 'accent':
          return 'secondary'; // Map to existing variants
        case 'outline':
          return 'outline';
        case 'ghost':
          return 'ghost';
        case 'link':
          return 'link';
        case 'destructive':
          return 'destructive';
        default:
          return 'default';
      }
    };

    return (
      <Button
        ref={ref}
        variant={getButtonVariant()}
        className={cn(
          // Default styling
          "font-medium transition-all active:scale-95",
          
          // Additional variant-specific styling
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
