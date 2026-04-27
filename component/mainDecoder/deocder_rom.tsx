import { useMainDecoder } from "../../lib/riscv/mainDecoder";
import { sprintf } from "@std/fmt/printf";

export default function MainDecoderRom() {
  const { mainDecoderData } = useMainDecoder();

  return (
    <div className="p-4 bg-slate-100 rounded-lg border border-slate-200">
      <p className="font-semibold text-slate-900 mb-2">Generated Decoder ROM</p>
      <textarea>
        {(() => {
          const generated_rom = Array.from({ length: 2 ** 5 }, (_) => sprintf("0x%03X", 0));
          for (const inst of mainDecoderData) {
            const op6_3 = inst.op >> 2;
            generated_rom[op6_3] = sprintf("0x%03X", inst.value);
          }
          return "v2.0 raw\n" + generated_rom.join("\n");
        })()}
      </textarea>
    </div>
  );
}
