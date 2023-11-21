import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import AddProductPage from "./AddProduct/AddProductPage";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/AddProductPage" element={<AddProductPage />} />
        </Routes>
      </div>
    </div>
  );
  
}

export default App;
