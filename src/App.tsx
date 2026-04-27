import Navbar from "../component/Navbar";
import { useHashRoute } from "./router";
import MainDecoderPage from "./pages/MainDecoderPage";
import AluDecoderPage from "./pages/AluDecoderPage";
import "./App.css";

function AppContent() {
  const [route] = useHashRoute();

  return (
    <div className="min-h-screen transition-colors duration-200">
      <Navbar />
      {route === "/main" ? <MainDecoderPage /> : <AluDecoderPage />}
      <footer className="text-sm text-center px-4 py-2">
        <p>การลอกไฟล์นี้ไม่มีความหมายอะไร เพราะแต่ละกลุ่มมันไม่เหมือนกัน 😂</p>
        <p>Written by A1UM1</p>
      </footer>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
