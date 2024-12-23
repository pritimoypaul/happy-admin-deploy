import * as React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: any;
}

const IconInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, ...props }, ref) => {
    return (
      <div className="relative flex items-center bg-background px-3 py-0 rounded-md border border-input">
        <Image src={icon} alt="icn" height={20} width={20} />
        <input
          type={type}
          className={cn(
            "flex h-10 w-full ml-2 text-base bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
IconInput.displayName = "IconInput";

export { IconInput };
