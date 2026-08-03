import { useState } from "react";
import AuthScreen from "./auth/AuthScreen";
import NamePrompt from "./auth/NamePrompt";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("dabba_token"));
  const [justLoggedIn, setJustLoggedIn] = useState(false)

  const handleAuthenticated = (newToken) => {
    setToken(newToken)
    setJustLoggedIn(true)
  }

  if (!token) return <AuthScreen onAuthenticated={handleAuthenticated} />;
  if (justLoggedIn) return <NamePrompt token={token} onDone={(e) => setJustLoggedIn(false)} />

  return <h1>Logged in</h1>;
};

export default App;
