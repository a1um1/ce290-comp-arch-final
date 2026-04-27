import { useHashRoute, type Route } from "../src/router";

export default function Navbar() {
  const [route, navigate] = useHashRoute();

  const Item = ({ to, label }: { to: Route; label: string }) => (
    <button
      onClick={() => navigate(to)}
      className={
        "px-3 py-1 rounded transition-colors " +
        (route === to
          ? "bg-blue-600 dark:bg-blue-500 text-white"
          : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700")
      }
    >
      {label}
    </button>
  );

  return (
    <nav className="w-full sticky top-0 z-10 bg-blue-100/70 dark:bg-gray-800/70 backdrop-blur border-b border-blue-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-3 py-2 flex items-center justify-between">
        <div className="font-bold text-blue-700 dark:text-blue-400">RISC-V Control Visualizer</div>
        <div className="flex gap-2 items-center">
          <Item to="/main" label="Main Decoder" />
          <Item to="/alu" label="ALU Decoder" />
        </div>
      </div>
    </nav>
  );
}
