import { useAluDecoder } from "../../lib/riscv/aluDecoder";

export default function AluDecoderTest() {
  const { testCaseText } = useAluDecoder();
  return (
    <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 ">
      <p className="font-semibold text-slate-900  mb-2">ALU Decoder Test Case</p>
      <textarea>{testCaseText}</textarea>
    </div>
  );
}
