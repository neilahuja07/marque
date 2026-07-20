interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-[12px]",
  md: "h-10 w-10 text-[14px]",
  lg: "h-16 w-16 text-[20px]",
};

export function Avatar({ initials, size = "md", className = "" }: AvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-sage/20 font-display font-medium text-teal-dark ${sizes[size]} ${className}`}
    >
      {initials}
    </div>
  );
}
