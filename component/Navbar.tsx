import { useHashRoute, type Route } from "../src/router";

export default function Navbar() {
  const [route, navigate] = useHashRoute();

  const Item = ({ to, label }: { to: Route; label: string }) => (
    <button
      onClick={() => navigate(to)}
      className={
        "px-3 py-1 rounded transition-colors " +
        (route === to
          ? "bg-blue-600 text-white"
          : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50")
      }
    >
      {label}
    </button>
  );

  return (
    <nav className="w-full sticky top-0 z-10 bg-blue-100/70 backdrop-blur border-b border-blue-200">
      <div className="max-w-5xl mx-auto px-3 py-2 flex items-center justify-between">
        <div className="font-bold text-blue-700">RISC-V Control Visualizer</div>
        <div className="flex gap-2 items-center">
          <Item to="/main" label="Main Decoder" />
          <Item to="/alu" label="ALU Decoder" />
        </div>
      </div>
    </nav>
  );
}
