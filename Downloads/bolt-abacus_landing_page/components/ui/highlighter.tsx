import React from "react";
import { RoughNotation } from "react-rough-notation";

import { cn } from "@/lib/utils";

interface HighlighterProps extends React.ComponentPropsWithoutRef<"span"> {
    children: React.ReactNode;
    color?: string;
    action?:
    | "highlight"
    | "circle"
    | "box"
    | "bracket"
    | "crossed-off"
    | "strike-through"
    | "underline";
    strokeWidth?: number;
    animationDuration?: number;
    iterations?: number;
    padding?: number;
    multiline?: boolean;
    isView?: boolean;
}

export const Highlighter = React.forwardRef<HTMLSpanElement, HighlighterProps>(
    (
        {
            children,
            color = "#ffd1dc",
            action = "highlight",
            strokeWidth = 1.5,
            animationDuration = 500,
            iterations = 2,
            padding = 2,
            multiline = true,
            isView = false,
            className,
            ...props
        },
        ref,
    ) => {
        return (
            <span ref={ref} className={cn("", className)} {...props}>
                <RoughNotation
                    show={!isView}
                    type={action}
                    color={color}
                    strokeWidth={strokeWidth}
                    animationDuration={animationDuration}
                    iterations={iterations}
                    padding={padding}
                    multiline={multiline}
                >
                    {children}
                </RoughNotation>
            </span>
        );
    },
);

Highlighter.displayName = "Highlighter";
