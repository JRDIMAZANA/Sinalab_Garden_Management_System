import OrderingSystem from "./components/orderingSystem.jsx";
import QueuingPage from "./pages/QueuingPage.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cashier" element={<OrderingSystem />} />
        <Route path="/queue" element={<QueuingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
