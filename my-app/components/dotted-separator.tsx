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
    color = "#d4d4d8",
    className,
    height = "2px",
    dotsize = "2px",
    gapsize = "6px", 
    direction = "horizontal"
}: DottedSeparatorProps) => {
    const isHorizontal = direction === "horizontal";

    return (
        <div className={cn(
            isHorizontal ? "w-full flex items-center" : "h-full flex flex-col items-center",
            className,
        )}>
            <div 
                className={isHorizontal ? "grow" : "grow-0"}
                style={{
                    width: isHorizontal ? "100%" : height,
                    height: isHorizontal ? height : "100%",
                    backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
                    backgroundSize: isHorizontal 
                        ? `${parseInt(dotsize) + parseInt(gapsize)}px ${height}` 
                        : `${height} ${parseInt(dotsize) + parseInt(gapsize)}px`,
                    backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
                    backgroundPosition: "center", 
                }}
            />
        </div>
    );
};