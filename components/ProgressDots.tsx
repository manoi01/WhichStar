interface Props {
  total: number;
  current: number;
}

export default function ProgressDots({ total, current }: Props) {
  return (
    <div
      className="flex gap-2 justify-center"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`คำถามที่ ${current + 1} จาก ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'w-6 h-2 bg-white'
              : i < current
                ? 'w-2 h-2 bg-white/60'
                : 'w-2 h-2 bg-white/20'
          }`}
        />
      ))}
    </div>
  );
}
