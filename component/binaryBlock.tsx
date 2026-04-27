export default function BinaryBlock({
  value,
}: {
  value: {
    value: string | number;
    length?: number;
    color: string;
  }[];
}) {
  return (
    <div className="flex justify-center">
      {value.map((bit) => (
        <div key={`bit-${bit.value}-${bit.color}`} className={`${bit.color} px-0.5 font-mono`}>
          {bit.value.toString().padStart(bit.length || 1, "0")}
        </div>
      ))}
    </div>
  );
}
