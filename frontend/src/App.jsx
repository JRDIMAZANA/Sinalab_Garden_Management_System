import "./style.css";
import OrderingSystem from "./components/orderingSystem.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/cashier" element={<OrderingSystem />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
