import { forwardRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  as?: ElementType;
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/**
 * Consistent page section: capped at 1280px, generous cinematic vertical
 * padding, uniform horizontal padding across breakpoints.
 */
export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ as: Tag = "section", id, className, innerClassName, children }, ref) => {
    const Component = Tag as ElementType;
    return (
      <Component
        ref={ref}
        id={id}
        className={cn("w-full py-24 md:py-32", className)}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12",
            innerClassName,
          )}
        >
          {children}
        </div>
      </Component>
    );
  },
);
SectionWrapper.displayName = "SectionWrapper";
