import { useAluDecoder } from "../../lib/riscv/aluDecoder";
import { sprintf } from "@std/fmt/printf";

export default function AluDecoderChart() {
  const { chartRows } = useAluDecoder();
  return (
    <div className="p-4 bg-slate-100 rounded-lg border border-slate-200">
      <p className="font-semibold text-slate-900-3">ALU Decoder Chart</p>
      <div className="p-4 bg-blue-100 rounded flex font-mono gap-3">
        <div className="text-center flex items-center gap-2 flex-col w-full">
          {chartRows.map((row) => (
            <div
              key={row.index}
              className={
                "w-full flex justify-between px-2 rounded " +
                (row.present
                  ? row.dependOnF5
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                  : "bg-blue-200 text-blue-600")
              }
            >
              <span>#{row.index}</span>
              {row.present
                ? row.dependOnF5
                  ? "Depend on f5"
                  : sprintf("0b%03b", row.aluControl ?? 0)
                : "0b000"}
            </div>
          ))}
        </div>
        <div className="bg-blue-400/50 p-2 flex items-center justify-center rounded text-blue-500 font-bold border-2 border-blue-500 border-dashed">
          Multiplexer
        </div>
      </div>
    </div>
  );
}
