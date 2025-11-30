import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import ListDetail from "./pages/listDetail/ListDetail.tsx";
import ListsOverview from "./pages/lists/ListsOverview.tsx";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Dashboard from "./pages/Dashboard";

function Home() {
    return (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
            <h1>Shopping List</h1>
            <p>Demo pages:</p>
            <ul>
                <li><Link to="/lists/list_123">Open sample list</Link></li>
            </ul>
        </div>
    );
}

const router = createBrowserRouter([
    { path: "/", element: <ListsOverview /> },
    { path: "/lists/:id", element: <ListDetail /> },

    { path: "*", element: <div style={{ padding: 16 }}>Not found</div> },

]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/*<AuthProvider>*/}
            <RouterProvider router={router} />
        {/*</AuthProvider>*/}
    </React.StrictMode>
);
