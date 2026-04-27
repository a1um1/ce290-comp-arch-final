import { useMainDecoder } from "../../lib/riscv/mainDecoder";
import { testCaseMaker } from "../../lib/testCaseMaker";

export default function MainDecoder_TestCase() {
  const { mainDecoderData } = useMainDecoder();
  return (
    <div className="p-4 bg-slate-100 dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700">
      <p className="font-semibold text-slate-900 dark:text-white mb-2">Generated Test case</p>
      <textarea>
        {testCaseMaker({
          headers: [
            "Op",
            "ALUSrc",
            "ImmSrc",
            "RegWrite",
            "ResultSrc",
            "MemWrite",
            "ALUOp",
            "Branch",
          ],
          data: mainDecoderData.map((inst) => [
            inst.op,
            inst.aluSrc ?? "x",
            inst.immSrc ?? "x",
            inst.regWrite ?? "x",
            inst.resultSrc ?? "x",
            inst.memWrite ?? "x",
            inst.ALUOpType,
            inst.branch ?? "x",
            "# " + inst.name,
          ]),
        })}
      </textarea>
    </div>
  );
}
