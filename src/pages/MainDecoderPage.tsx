import MainDecoderRom from "../../component/mainDecoder/deocder_rom";
import MainDecoder_TestCase from "../../component/mainDecoder/test";
import MainDecoder_table from "../../component/mainDecoder/decoder";

export default function MainDecoderPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <MainDecoder_table />
      <div className="grid grid-cols-2 gap-4">
        <MainDecoderRom />
        <MainDecoder_TestCase />
      </div>
    </div>
  );
}
