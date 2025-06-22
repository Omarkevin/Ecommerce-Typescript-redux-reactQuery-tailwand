import "./App.css";
import Navbar from "./Componants/pages/Navbar";
import MainContent from "./Componants/pages/MainContent";
import { Route, Routes } from "react-router-dom";
import CardDetails from "./Componants/pages/CardDetails";
import CartBasket from "./Componants/pages/CartBasket";
function App() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/product/:id" element={<CardDetails />}></Route>
          <Route path="/add" element={<CartBasket />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
