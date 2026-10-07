import { cn } from "@/lib/utils";

interface Props {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-2xl",
};

export function InternAvatar({
  firstName,
  lastName,
  imageUrl,
  size = "md",
  className,
}: Props) {
  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?";

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        className={cn(
          "rounded-full object-cover ring-2 ring-border",
          sizeMap[size],
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/10 font-semibold text-primary ring-2 ring-border",
        sizeMap[size],
        className,
      )}
    >
      {initials}
    </div>
  );
}
