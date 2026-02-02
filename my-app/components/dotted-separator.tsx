import { cn } from "@/lib/utils";
import { is } from "date-fns/locale";

interface DottedSeparatorProps {
    className?: string;
    color?: string;
    height?: string;
    dotsize?: string;
    gapsize?: string;
    direction?: "horizontal" | "vertical";
};

export const DottedSeparator = ({
    color="#d4d4d8",
    className,
    height ="2px",
    dotsize = "2px",
    gapsize="4px",
    direction = "horizontal"
}: DottedSeparatorProps) => {
    const ishorizontal = direction === "horizontal";

    return (
        <div className={cn(ishorizontal ? "w-full flex items-center" : "h-full flex flex-col items-center",
            className,
        )}>

        <div className={ishorizontal ? "flex-grow" : "flex-grow-0"}
            style={{
                width: ishorizontal ? "100%" : height,
                height: ishorizontal ? height : "100%",
                backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
                backgroundSize: ishorizontal 
                ? `${height} ${parseInt(dotsize) + parseInt(gapsize)}px`: `${height} ${parseInt(dotsize) +parseInt(gapsize)}px`,
                backgroundRepeat: ishorizontal?"repeat-x" : "repeat-y",
                backgroundPosition: "center", 

            }}
        />

        </div>
    )
}