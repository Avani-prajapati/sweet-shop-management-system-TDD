import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

// Pages
import SweetList from "./components/SweetList";
import AddSweet from "./components/AddSweet";
import EditSweet from "./components/EditSweet";
import PurchaseSweet from "./components/PurchaseSweet";
import RestockSweet from "./components/RestockSweet";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="px-14 bg-red-50">
    <Routes>
      {/* Sweet Routes */}
      <Route path="/" element={<SweetList />} />
      <Route path="/sweets/add" element={<AddSweet />} />
      <Route path="/sweets/edit/:id" element={<EditSweet/>} />
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
