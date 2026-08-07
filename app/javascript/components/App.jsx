import { useState } from "react";
import AuthScreen from "./auth/AuthScreen";
import NamePrompt from "./auth/NamePrompt";
import MomentScreen from "./checkin/MomentScreen";
import CheerWallScreen from "./CheerWallScreen";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("dabba_token"));
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [tab, setTab] = useState("moment");

  const handleAuthenticated = (newToken) => {
    setToken(newToken);
    setJustLoggedIn(true);
  };

  if (!token) return <AuthScreen onAuthenticated={handleAuthenticated} />;
  if (justLoggedIn)
    return <NamePrompt token={token} onDone={(e) => setJustLoggedIn(false)} />;

  return (
    <div className="min-h-screen bg-dabba-bg flex flex-col">
      <nav className='flex justify-center gap-2 pt-6'>
        <button
          onClick={() => setTab("moment")}
          className={`text-xs font-mono uppercase tracking-widest px-3 ${tab === "moment" ? "text-dabba-amber" : "text-dabba-text/40"} cursor-pointer`}
        >
          Check Moment
        </button>
        <button
          onClick={() => setTab("cheerwall")}
          className={`text-xs font-mono uppercase tracking-widest px-3 ${tab === "cheerwall" ? "text-dabba-amber" : "text-dabba-text/40"} cursor-pointer`}
        >
          Cheer Wall
        </button>
      </nav>
      <div className="flex-1 flex items-center justify-center px-6">
        {tab === "moment" ? <MomentScreen /> : <CheerWallScreen />}
      </div>
    </div>
  );
};

export default App;
