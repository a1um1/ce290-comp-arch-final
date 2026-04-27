import { useAluDecoder } from "../../lib/riscv/aluDecoder";
import { sprintf } from "@std/fmt/printf";

export default function AluDecoderChart() {
  const { chartRows } = useAluDecoder();
  return (
    <div className="p-4 bg-slate-100 dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700">
      <p className="font-semibold text-slate-900 dark:text-white mb-3">ALU Decoder Chart</p>
      <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded flex font-mono gap-3">
        <div className="text-center flex items-center gap-2 flex-col w-full">
          {chartRows.map((row) => (
            <div
              key={row.index}
              className={
                "w-full flex justify-between px-2 rounded " +
                (row.present
                  ? row.dependOnF5
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                    : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  : "bg-blue-200 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400")
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
        <div className="bg-blue-400/50 dark:bg-blue-600/30 p-2 flex items-center justify-center rounded text-blue-500 dark:text-blue-400 font-bold border-2 border-blue-500 dark:border-blue-600 border-dashed">
          Multiplexer
        </div>
      </div>
    </div>
  );
}
