import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    [
        "inline-flex items-center justify-center gap-2 whitespace-nowrap",
        "rounded-full font-semibold",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:translate-y-[1px]",
    ].join(" "),
    {
        variants: {
            variant: {
                default: cn(
                    "bg-gradient-to-r from-emerald-600 via-lime-500 to-emerald-600 bg-[length:200%_200%]",
                    "text-white shadow-md",
                    "hover:shadow-xl hover:-translate-y-0.5 hover:bg-[position:100%_0%]",
                    "focus-visible:ring-emerald-500 focus-visible:ring-offset-white"
                ),
                secondary: cn(
                    "bg-slate-900 text-white shadow-md",
                    "hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5",
                    "focus-visible:ring-slate-400 focus-visible:ring-offset-white"
                ),
                outline: cn(
                    "border border-slate-200 bg-white/70 text-slate-800 backdrop-blur",
                    "hover:bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5",
                    "focus-visible:ring-slate-300 focus-visible:ring-offset-white"
                ),
                ghost: cn(
                    "text-slate-700 hover:bg-slate-100",
                    "focus-visible:ring-slate-300 focus-visible:ring-offset-white"
                ),
                destructive: cn(
                    "bg-gradient-to-r from-rose-600 to-orange-500 text-white shadow-md",
                    "hover:shadow-xl hover:-translate-y-0.5",
                    "focus-visible:ring-rose-400 focus-visible:ring-offset-white"
                ),
            },
            size: {
                default: "h-12 px-6 text-base",
                sm: "h-10 px-4 text-sm",
                lg: "h-14 px-8 text-lg",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
