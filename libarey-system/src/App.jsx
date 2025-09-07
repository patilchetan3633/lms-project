import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LibraryNavbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Members from "./Components/Members/Member";
import Books from "./Components/Books/Books";


function App() {
  
  return (
    <div>
      {/* <BrowserRouter> */}
      <LibraryNavbar />
      <Routes>
        {/* <Route path="/" element={""} /> */}
        <Route path="/" element={<Books />} />
        <Route path="/Members" element={<Members />} />
        <Route path="*" element={<h1>Page-Note-Found</h1>} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;





