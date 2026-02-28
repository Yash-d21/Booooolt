import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface InteractiveHoverButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

const InteractiveHoverButton = React.forwardRef<
    HTMLButtonElement,
    InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-8 text-center font-semibold",
                className,
            )}
            {...props}
        >
            <span className="relative z-10 inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 shrink-0 whitespace-nowrap">
                {text}
            </span>
            <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-primary-foreground">
                <span className="shrink-0 whitespace-nowrap">{text}</span>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-primary-foreground">
                <ArrowRight className="shrink-0" size={18} />
            </div>
            <div className="absolute left-5 top-1/2 -translate-y-1/2 h-2 w-2 scale-100 rounded-full bg-primary transition-transform duration-300 group-hover:scale-[80] z-0"></div>
        </button>
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
