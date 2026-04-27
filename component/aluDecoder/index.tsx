import AluDecoderTable from "./Table";
import AluDecoderChart from "./Chart";
import AluDecoderTest from "./Test";

export default function AluDecoder() {
  return (
    <div>
      <AluDecoderTable />
      <div className="grid grid-cols-2 gap-4">
        <AluDecoderChart />
        <AluDecoderTest />
      </div>
    </div>
  );
}
