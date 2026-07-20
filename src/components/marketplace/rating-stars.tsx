export function RatingStars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5 text-[13px] text-slate">
      <span className="text-brass">
        {"★".repeat(Math.floor(rating))}
        {rating % 1 >= 0.5 ? "½" : ""}
      </span>
      <span className="font-medium text-ink">{rating}</span>
      <span>({count})</span>
    </div>
  );
}
