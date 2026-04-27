import { useMainDecoder } from "../../lib/riscv/mainDecoder";
import BinaryBlock from "../binaryBlock";
import { sprintf } from "@std/fmt/printf";

export default function MainDecoder_table() {
  const { mainDecoderData } = useMainDecoder();
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Main Decoder</h2>
      <p className="text-slate-600 dark:text-gray-300 mb-4">Hex สำหรับการ Decode จะประกอบด้วย</p>
      <BinaryBlock
        value={[
          { value: "ALUsrc", color: "bg-red-500 text-white" },
          { value: "ImmSrc (3)", color: "bg-green-500 text-white", length: 3 },
          { value: "RegWrite", color: "bg-purple-500 text-white" },
          { value: "ResultSrc (2)", color: "bg-yellow-500 text-white", length: 2 },
          { value: "MemWrite", color: "bg-pink-500 text-white" },
          { value: "ALUOp (2)", color: "bg-cyan-500 text-white", length: 2 },
          { value: "Branch", color: "bg-blue-500 text-white" },
        ]}
      />
      <table className="defaultTable font-mono text-center dark:bg-gray-800">
        <thead>
          <tr>
            <th colSpan={2}></th>
            <th colSpan={2} className="bg-purple-300">
              Control inputs
            </th>
            <th colSpan={9} className="bg-green-300">
              Control Output
            </th>
          </tr>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th className="bg-purple-300">Op</th>
            <th className="bg-purple-300">Op[6:3]</th>
            <th className="bg-red-300">ALUSrc</th>
            <th className="bg-green-300">ImmSrc</th>
            <th className="bg-purple-300">RegWrite</th>
            <th className="bg-yellow-300">ResultSrc</th>
            <th className="bg-pink-300">MemWrite</th>
            <th className="bg-cyan-300">ALUOp</th>
            <th className="bg-blue-300">Branch</th>
            <th className="bg-green-300">Binary</th>
            <th className="bg-green-300">Hex</th>
          </tr>
        </thead>
        <tbody>
          {mainDecoderData.map((inst, index) => (
            <tr key={index}>
              <td>{inst.type}</td>
              <td>{inst.name}</td>
              <td className="bg-purple-100">{inst.op}</td>
              <td className="bg-purple-100">
                {inst.op6_3.toString(2).padStart(4, "0").slice(0, 4)}
              </td>
              <td className="bg-red-100">{inst.aluSrc ?? "x"}</td>
              <td className="bg-green-100">{inst.immSrc ?? "x"}</td>
              <td className="bg-purple-100">{inst.regWrite ?? "x"}</td>
              <td className="bg-yellow-100">{inst.resultSrc ?? "x"}</td>
              <td className="bg-pink-100">{inst.memWrite ?? "x"}</td>
              <td className="bg-cyan-100">{inst.ALUOpType}</td>
              <td className="bg-blue-100">{inst.branch ?? "x"}</td>
              <td className="bg-green-100">
                <BinaryBlock value={inst.binaryBlock} />
              </td>{" "}
              <td className="bg-green-100">{sprintf("0x%03X", inst.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
