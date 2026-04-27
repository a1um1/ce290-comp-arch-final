import { riscv_instruction_types, riscv_alu_op_types } from "./instruction";
import { create } from "zustand";

export const process_instruction_types = () => {
  return riscv_instruction_types.map((inst) => {
    const op6_3 = inst.op >> 2;
    const base = 0b0_000_0_00_0_0_00_0;
    const aluSrc = (inst.aluSrc ?? 0) << 10;
    const immSrc = (inst.immSrc ?? 0) << 7;
    const regWrite = (inst.regWrite ?? 0) << 6;
    const resultSrc = (inst.resultSrc ?? 0) << 4;
    const memWrite = (inst.memWrite ?? 0) << 3;
    const ALUOp = riscv_alu_op_types[inst.ALUOp ?? "0-000"];
    const branch = inst.branch ?? 0;
    const value =
      base | aluSrc | immSrc | regWrite | resultSrc | memWrite | (ALUOp.result << 1) | branch;
    return {
      ...inst,
      op6_3,
      value,
      ALUOpType: ALUOp.result,
      isDependOnFunct3: "depend_on_funct3" in ALUOp && ALUOp.depend_on_funct3,
      binaryBlock: [
        { value: inst.aluSrc ?? 0, color: "bg-red-500 text-white" },
        {
          value: (inst.immSrc ?? 0).toString(2),
          color: "bg-green-500 text-white",
          length: 3,
        },
        { value: inst.regWrite ?? 0, color: "bg-purple-500 text-white" },
        {
          value: (inst.resultSrc ?? 0).toString(2),
          color: "bg-yellow-500 text-white",
          length: 2,
        },
        { value: inst.memWrite ?? 0, color: "bg-pink-500 text-white" },
        {
          value: ALUOp.result.toString(2),
          color: "bg-cyan-500 text-white",
          length: 2,
        },
        { value: inst.branch ?? 0, color: "bg-blue-500 text-white" },
      ],
    };
  });
};

export const useMainDecoder = create<{
  mainDecoderData: ReturnType<typeof process_instruction_types>;
}>(() => ({
  mainDecoderData: process_instruction_types(),
}));
