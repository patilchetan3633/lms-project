import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);
  const [toasts, setToasts] = useState([]);

  const login = (username, password) => {
    if (username.toLowerCase() === "admin" && password === "123") {
      setIsLoggedIn(true);
      setRole("admin");
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", "admin");
      showToast("success", "Welcome Admin!");
      return null;
    }

    if (username.toLowerCase() === "user" && password === "123") {
      setIsLoggedIn(true);
      setRole("user");
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", "user");
      showToast("success", "Welcome User!");
      return null;
    }

    showToast("error", "❌ Invalid username or password!");
    return "Invalid credentials!";
  };

  // ---- LOGOUT ----
  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    showToast("error", "Logged out successfully!");
  };

  const showToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const requireLogin = (actionName) => {
    if (!isLoggedIn) {
      showToast("error", "Please login first!");
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, login, logout, showToast, requireLogin }}
    >
      {children}

      <div style={styles.toastContainer}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              ...styles.toast,
              ...(toast.type === "error"
                ? styles.error
                : toast.type === "success"
                  ? styles.success
                  : {}),
            }}
          >
            {toast.type === "error" ? "❌ " : "✅ "}
            {toast.message}
          </div>
        ))}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const styles = {
  toastContainer: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1000,
  },
  toast: {
    width: "300px",
    padding: "12px 18px",
    borderRadius: "6px",
    marginBottom: "10px",
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  },
  success: { backgroundColor: "green" },
  error: { backgroundColor: "red" },
  info: { backgroundColor: "blue" },
  warning: { backgroundColor: "orange" },
};
