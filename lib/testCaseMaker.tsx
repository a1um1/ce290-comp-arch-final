export const testCaseMaker = ({ headers, data }: { headers: string[]; data: any[][] }) => {
  return (
    headers.join("\t") +
    "\n" +
    data
      .map((row) => {
        return row.join("\t");
      })
      .join("\n")
  );
};
