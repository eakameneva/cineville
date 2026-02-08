import { BrowserRouter, Route, Routes } from "react-router";
import { SchedulePage } from "./pages/SchedulePage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
};
