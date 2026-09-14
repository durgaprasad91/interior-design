type Props = {
  n: string;
  label: string;
  title: React.ReactNode;
  sub?: string;
  light?: boolean;
};

export default function SectionHead({ n, label, title, sub, light }: Props) {
  return (
    <div className="max-w-[52ch]">
      <p className={`eyebrow reveal ${light ? "!text-bone/50" : ""}`}>
        {n} / {label}
      </p>
      <h2
        className={`display reveal mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] ${
          light ? "text-bone" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`reveal mt-6 text-[1.02rem] leading-relaxed ${
            light ? "text-bone/60" : "text-muted"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
