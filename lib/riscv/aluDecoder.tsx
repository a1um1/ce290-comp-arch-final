import { create } from "zustand";
import { sprintf } from "@std/fmt/printf";
import { testCaseMaker } from "../testCaseMaker";
import { riscv_alu_decoder_table, riscv_alu_op_types } from "./instruction";

export type AluDecoderEntry = (typeof riscv_alu_decoder_table)[number];

type ChartRow = {
  index: number;
  present: boolean;
  dependOnF5: boolean;
  aluControl?: number;
};

function buildChartRows(entries: AluDecoderEntry[]): ChartRow[] {
  const rows: ChartRow[] = Array.from({ length: 8 }, (_, i) => ({
    index: i,
    present: false,
    dependOnF5: false,
  }));
  for (const e of entries) {
    if (e.funct3 === undefined) continue;
    const row = rows[e.funct3];
    row.present = true;
    if (e.funct3 === 0b000 && e.Op5_F75 && e.Op5_F75.length > 0) {
      row.dependOnF5 = true;
    } else {
      row.aluControl = e.ALUcontrol;
    }
  }
  return rows;
}

function buildTestCase(entries: AluDecoderEntry[]): string {
  const headers = ["ALUOp", "Func3", "Op[5]", "Func7[5]", "ALUControl"];
  const data = entries.flatMap((v) => {
    const aluOpBits = riscv_alu_op_types[v.ALUOp].result;
    if (!v.Op5_F75) {
      return [
        [aluOpBits, v.funct3 ?? "x", "x", "x", sprintf("0b%03b", v.ALUcontrol), `# ${v.name}`],
      ];
    }
    return v.Op5_F75.map((b) => {
      const twoBits = sprintf("%02b", b);
      return [
        aluOpBits,
        v.funct3 ?? "x",
        twoBits.at(0),
        twoBits.at(1),
        sprintf("0b%03b", v.ALUcontrol),
        `# ${v.name}`,
      ];
    });
  });
  return testCaseMaker({ headers, data });
}

export const useAluDecoder = create<{
  entries: AluDecoderEntry[];
  chartRows: ChartRow[];
  testCaseText: string;
}>(() => {
  const entries = riscv_alu_decoder_table;
  return {
    entries,
    chartRows: buildChartRows(entries),
    testCaseText: buildTestCase(entries),
  };
});
