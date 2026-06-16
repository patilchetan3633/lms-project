
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../src/App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import { Provider } from "react-redux";
import { store } from "./Store/Store";

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
      </Provider>
    </BrowserRouter>
  </>
);
