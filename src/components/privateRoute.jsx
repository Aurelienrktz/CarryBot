import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  // Vérifie si l'utilisateur est connecté (token JWT stocké)
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    // Pas de token → redirection vers login
    return <Navigate to="/login" replace />;
  }

  // Sinon → affiche le composant enfant
  return children;
}
