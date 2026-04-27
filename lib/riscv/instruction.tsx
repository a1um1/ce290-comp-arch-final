export const riscv_alu_op_types = {
  "0-000": {
    result: 0b000,
  },
  "1-001": {
    result: 0b001,
  },
  "2-func3": {
    result: 0b010,
    depend_on_funct3: true,
  },
  "3-000": {
    result: 0b000,
  },
} as const satisfies {
  [key: string]: {
    result: number;
    depend_on_funct3?: boolean;
  };
};

export const riscv_alu_control_table = {
  0b000: {
    name: "ADD",
    jsFunction: (a, b) => a + b,
  },
  0b001: {
    name: "SUB",
    jsFunction: (a, b) => a - b,
  },
  0b010: {
    name: "AND",
    jsFunction: (a, b) => a & b,
  },
  0b011: {
    name: "OR",
    jsFunction: (a, b) => a | b,
  },
  0b100: {
    name: "XOR",
    jsFunction: (a, b) => a ^ b,
  },
  0b101: {
    name: "SLT",
    jsFunction: (a, b) => (a < b ? 1 : 0),
  },
  0b110: {
    name: "SLL",
    jsFunction: (a, b) => a << b,
  },
  0b111: {
    name: "SRL",
    jsFunction: (a, b) => a >> b,
  },
} as const satisfies {
  [code: number]: {
    name: string;
    jsFunction: (a: number, b: number) => number;
  };
};

export const riscv_alu_decoder_table: {
  ALUOp: keyof typeof riscv_alu_op_types;
  funct3?: number;
  Op5_F75?: number[];
  ALUcontrol: keyof typeof riscv_alu_control_table;
  name: string;
}[] = [
  {
    ALUOp: "0-000",
    ALUcontrol: 0b000,
    name: "LW, SW",
  },
  {
    ALUOp: "1-001",
    ALUcontrol: 0b001,
    name: "beq",
  },
  {
    ALUOp: "2-func3",
    funct3: 0b000,
    Op5_F75: [0b00, 0b01, 0b10],
    ALUcontrol: 0b000,
    name: "add",
  },
  {
    ALUOp: "2-func3",
    funct3: 0b000,
    Op5_F75: [0b11],
    ALUcontrol: 0b001,
    name: "sub",
  },
  {
    ALUOp: "2-func3",
    funct3: 0b111,
    ALUcontrol: 0b010,
    name: "and",
  },
  {
    ALUOp: "2-func3",
    funct3: 0b110,
    ALUcontrol: 0b011,
    name: "or",
  },
  {
    ALUOp: "2-func3",
    funct3: 0b100,
    ALUcontrol: 0b100,
    name: "xor",
  },
  {
    ALUOp: "2-func3",
    funct3: 0b010,
    ALUcontrol: 0b101,
    name: "slt",
  },
  {
    ALUOp: "2-func3",
    funct3: 0b001,
    ALUcontrol: 0b110,
    name: "sll",
  },
  {
    ALUOp: "2-func3",
    funct3: 0b101,
    ALUcontrol: 0b111,
    name: "srl",
  },
];

export const riscv_instruction_types: {
  type: string;
  name: string;
  op: number;
  aluSrc?: number;
  immSrc?: number;
  regWrite?: number;
  resultSrc?: number;
  memWrite?: number;
  ALUOp?: keyof typeof riscv_alu_op_types;
  branch?: number;
}[] = [
  {
    type: "I",
    name: "lw",
    op: 0b0000011,
    aluSrc: 1,
    immSrc: 0b00,
    regWrite: 1,
    resultSrc: 1,
    memWrite: 0,
    ALUOp: "0-000",
    branch: 0,
  },
  {
    type: "I",
    name: "I-type",
    op: 0b0010011,
    aluSrc: 1,
    immSrc: 0b00,
    regWrite: 1,
    resultSrc: 0,
    memWrite: 0,
    ALUOp: "2-func3",
    branch: 0,
  },
  {
    type: "S",
    name: "sw",
    op: 0b0100011,
    aluSrc: 1,
    immSrc: 0b01,
    regWrite: 0,
    memWrite: 1,
    ALUOp: "0-000",
    branch: 0,
  },
  {
    type: "R",
    name: "R-type",
    op: 0b0110011,
    aluSrc: 0,
    regWrite: 1,
    resultSrc: 0,
    memWrite: 0,
    ALUOp: "2-func3",
    branch: 0,
  },
  {
    type: "B",
    name: "B-type",
    op: 0b1100011,
    aluSrc: 0,
    immSrc: 0b10,
    regWrite: 0,
    memWrite: 0,
    ALUOp: "1-001",
    branch: 1,
  },
  {
    type: "U",
    name: "LUI",
    op: 0b0110111,
    aluSrc: 1,
    immSrc: 0b11,
    regWrite: 1,
    memWrite: 0,
    resultSrc: 3,
    ALUOp: "0-000",
    branch: 0,
  },
];
