import MainPage from "./pages/MainPage";
import MealPage from "./pages/MealPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/meal-instructions" element={<MealPage />} />
      </Routes>
    </BrowserRouter>
  );
}
