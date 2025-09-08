import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LibraryNavbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Books from "./Components/Books/Books";
import Members from "./Components/Members/Member";
import Fines from "./Components/Fines/Fines";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  // Login state App level pe maintain karna
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  return (
    <>
      <LibraryNavbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        role={role}
        setRole={setRole}
      />

      <Routes>
        {/*  Default page = Dashboard (always open) */}
        <Route path="/" element={<Dashboard />} />

        {/* Protected routes */}
        <Route
          path="/books"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Books />
            </PrivateRoute>
          }
        />
        <Route
          path="/members"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Members />
            </PrivateRoute>
          }
        />
        <Route
          path="/fines"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Fines />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
