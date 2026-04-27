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
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
