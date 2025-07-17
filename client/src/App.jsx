import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import SweetList from "./pages/SweetList";
import AddSweet from "./pages/AddSweet";
import EditSweet from "./pages/EditSweet";
import PurchaseSweet from "./pages/PurchaseSweet";
import RestockSweet from "./pages/RestockSweet";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Redirect to sweets list */}
      <Route path="/" element={<Navigate to="/sweets" replace />} />

      {/* Sweet Routes */}
      <Route path="/sweets" element={<SweetList />} />
      <Route path="/sweets/add" element={<AddSweet />} />
      <Route path="/sweets/edit/:id" element={<EditSweet />} />

      {/* Purchase & Stock */}
      <Route path="/sweets/purchase/:id" element={<PurchaseSweet />} />
      <Route path="/sweets/stock/:id" element={<RestockSweet />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
