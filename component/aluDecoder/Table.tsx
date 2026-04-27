import { useAluDecoder } from "../../lib/riscv/aluDecoder";
import { sprintf } from "@std/fmt/printf";

export default function AluDecoderTable() {
  const { entries } = useAluDecoder();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-900">ALU Decoder</h2>
      <table className="defaultTable font-mono text-center">
        <thead>
          <tr>
            <th>ALUOp</th>
            <th>funct3</th>
            <th>Op5_F75</th>
            <th>ALUcontrol</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.ALUOp}</td>
              <td>{entry.funct3 !== undefined ? sprintf("%03b", entry.funct3) : "x"}</td>
              <td>{entry.Op5_F75?.map((v) => sprintf("%02b", v)).join(", ") || "x"}</td>
              <td>{sprintf("%03b", entry.ALUcontrol)}</td>
              <td>{entry.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
