interface Props {
  title: string;
  value: string;
}

export default function SummaryCard({
  title,
  value,
}: Props) {

  return (
    <div className="
      bg-white/5
      border
      border-white/10
      rounded-3xl
      p-6
      backdrop-blur-xl
      hover:scale-[1.02]
      transition
    ">

      <p className="
        text-gray-400
      ">
        {title}
      </p>

      <h2 className="
        text-3xl
        font-bold
        text-white
        mt-3
      ">
        {value}
      </h2>

    </div>
  );
}