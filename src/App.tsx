import Navbar from "../component/Navbar";
import { useHashRoute } from "./router";
import MainDecoderPage from "./pages/MainDecoderPage";
import AluDecoderPage from "./pages/AluDecoderPage";
import { DarkModeProvider, useDarkMode } from "./DarkModeContext";
import "./App.css";

function AppContent() {
  const [route] = useHashRoute();
  const { isDark } = useDarkMode();

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar />
      {route === "/main" ? <MainDecoderPage /> : <AluDecoderPage />}
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
