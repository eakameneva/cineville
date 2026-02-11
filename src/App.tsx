import { BrowserRouter, Route, Routes } from "react-router";
import { SchedulePage } from "./pages/SchedulePage";
import { EventDetailsPage } from "./pages/EventDetailsPage";

export const App = () => {
  return (
    <BrowserRouter basename="/cineville">
      <Routes>
        <Route path="/" element={<SchedulePage />} />
        <Route path="/details/:eventId" element={<EventDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
